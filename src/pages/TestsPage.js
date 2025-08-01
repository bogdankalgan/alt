import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import TestForm from '../components/tests/TestForm';
import TestList from '../components/tests/TestList';
import TestResultViewer from '../components/tests/TestResultViewer';
import MainLayout from "../layout/MainLayout";

const TestsPage = () => {
    const [tests, setTests] = useState([]);
    const [editingTest, setEditingTest] = useState(null);

    const fetchTests = async () => {
        const { data, error } = await supabase
            .from('tests')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) console.error('Ошибка загрузки тестов:', error);
        else setTests(data);
    };

    useEffect(() => {
        fetchTests();
    }, []);

    const handleAddOrUpdate = async (formData) => {
        if (formData.id) {
            const { error } = await supabase
                .from('tests')
                .update(formData)
                .eq('id', formData.id);
            if (error) return console.error('Ошибка при обновлении:', error);
        } else {
            const { error } = await supabase.from('tests').insert([formData]);
            if (error) return console.error('Ошибка при добавлении:', error);
        }
        fetchTests();
        setEditingTest(null);
    };

    const handleDelete = async (id) => {
        const { error } = await supabase.from('tests').delete().eq('id', id);
        if (error) return console.error('Ошибка при удалении:', error);
        fetchTests();
    };

    const handleReorder = async (reorderedTests) => {
        const updates = reorderedTests.map((t) =>
            supabase.from('tests').update({ sort_order: t.sort_order }).eq('id', t.id)
        );
        await Promise.all(updates);
        setTests([...reorderedTests]);
    };

    return (
        <MainLayout className="p-6">
            <h1 className="text-2xl font-bold mb-6">Настройка тестов</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TestForm
                    test={editingTest}
                    onSubmit={handleAddOrUpdate}
                    onCancel={() => setEditingTest(null)}
                    onSave={handleAddOrUpdate}
                />
                <TestList
                    tests={tests}
                    onEdit={setEditingTest}
                    onDelete={handleDelete}
                    onReorder={handleReorder}
                />
            </div>

            <div className="mt-8">
                <TestResultViewer tests={tests} />
            </div>
        </MainLayout>
    );
};

export default TestsPage;
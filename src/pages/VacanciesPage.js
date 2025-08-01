import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import VacancyList from "../components/vacancies/VacancyList";
import VacancyForm from "../components/vacancies/VacancyForm";
import MainLayout from "../layout/MainLayout";

export default function VacanciesPage() {
    const [vacancies, setVacancies] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingVacancy, setEditingVacancy] = useState(null);

    const fetchVacancies = async () => {
        const { data, error } = await supabase
            .from("vacancies")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            console.error("Ошибка при загрузке вакансий:", error);
        } else {
            setVacancies(data);
        }
    };

    useEffect(() => {
        fetchVacancies();
    }, []);

    const handleAddVacancy = () => {
        setEditingVacancy(null);
        setShowForm(true);
    };

    const handleVacancyEdit = (vacancy) => {
        setEditingVacancy(vacancy);
        setShowForm(true);
    };

    const handleVacancyDeleted = async (id) => {
        const { error } = await supabase.from("vacancies").delete().eq("id", id);
        if (error) {
            console.error("Ошибка при удалении:", error);
        } else {
            fetchVacancies();
        }
    };

    const handleFormSuccess = () => {
        fetchVacancies();
        setShowForm(false);
        setEditingVacancy(null);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingVacancy(null);
    };

    return (
        <MainLayout className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Вакансии</h1>
                <button
                    onClick={handleAddVacancy}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Добавить вакансию
                </button>
            </div>

            <VacancyList
                vacancies={vacancies}
                onVacancyDeleted={handleVacancyDeleted}
                onVacancyEdit={handleVacancyEdit}
            />

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                        <VacancyForm
                            vacancy={editingVacancy}
                            onClose={handleCloseForm}
                            onSuccess={handleFormSuccess}
                        />
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
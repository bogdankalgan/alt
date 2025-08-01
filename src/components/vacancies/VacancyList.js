import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function VacancyList({ onVacancyDeleted, onVacancyEdit }) {
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVacancies = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("vacancies").select("*");
        if (!error) setVacancies(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        const { error } = await supabase.from("vacancies").delete().eq("id", id);
        if (!error) {
            setVacancies((prev) => prev.filter((v) => v.id !== id));
            if (onVacancyDeleted) onVacancyDeleted();
        }
    };

    useEffect(() => {
        fetchVacancies();
    }, []);

    if (loading) return <p>Загрузка...</p>;

    return (
        <div className="max-w-4xl mx-auto mt-6">
            <h2 className="text-xl font-semibold mb-4">Список вакансий</h2>
            {vacancies.length === 0 ? (
                <p>Вакансии отсутствуют.</p>
            ) : (
                vacancies.map((vacancy) => (
                    <div key={vacancy.id} className="border p-4 rounded mb-4 shadow-sm bg-white">
                        <p><strong>Должность:</strong> {vacancy.title}</p>
                        <p><strong>Описание:</strong> {vacancy.description}</p>
                        <p><strong>Требования:</strong> {vacancy.requirements}</p>
                        <p><strong>Зарплата:</strong> {vacancy.salary}</p>
                        <p><strong>География:</strong> {vacancy.location}</p>
                        <p><strong>Формат работы:</strong> {vacancy.format}</p>
                        <p><strong>Задачи и KPI:</strong> {vacancy.kpi}</p>
                        {vacancy.approved ? (
                            <p><strong>Согласовано</strong></p>
                        ) : (
                            <p><strong>Не согласовано</strong></p>
                        )}
                        <div className="flex gap-4 mt-3">
                            <button
                                onClick={() => onVacancyEdit(vacancy)}
                                className="text-blue-600 underline"
                            >
                                Редактировать
                            </button>
                            <button
                                onClick={() => handleDelete(vacancy.id)}
                                className="text-red-600 underline"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
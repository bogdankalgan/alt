import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function VacancyForm({ initialData, onVacancyAdded, onFormReset }) {
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        work_format: "",
        skills: "",
        salary_expectation: "",
        tasks: "",
        kpi: "",
        approved: false,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        let error;
        if (initialData?.id) {
            ({ error } = await supabase
                .from("vacancies")
                .update(formData)
                .eq("id", initialData.id));
        } else {
            ({ error } = await supabase
                .from("vacancies")
                .insert([formData]));
        }

        if (error) {
            setMessage("Ошибка при сохранении");
            console.error(error);
        } else {
            setMessage("Вакансия сохранена");
            onVacancyAdded?.();
            onFormReset?.();
            setFormData({
                title: "",
                location: "",
                work_format: "",
                skills: "",
                salary_expectation: "",
                tasks: "",
                kpi: "",
                approved: false,
            });
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
                {initialData ? "Редактировать вакансию" : "Добавить вакансию"}
            </h2>

            <label className="block mb-2">
                Должность
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </label>

            <label className="block mb-2">
                География
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </label>

            <label className="block mb-2">
                Формат работы
                <input
                    type="text"
                    name="work_format"
                    value={formData.work_format}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </label>

            <label className="block mb-2">
                Навыки
                <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </label>

            <label className="block mb-2">
                Зарплатные ожидания
                <input
                    type="text"
                    name="salary_expectation"
                    value={formData.salary_expectation}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </label>

            <label className="block mb-2">
                Задачи
                <textarea
                    name="tasks"
                    value={formData.tasks}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </label>

            <label className="block mb-2">
                KPI
                <textarea
                    name="kpi"
                    value={formData.kpi}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </label>

            <label className="block mb-4">
                <input
                    type="checkbox"
                    name="approved"
                    checked={formData.approved}
                    onChange={handleChange}
                    className="mr-2"
                />
                Согласовано с рекрутером
            </label>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? "Сохраняю..." : "Сохранить"}
            </button>

            {initialData && (
                <button
                    type="button"
                    onClick={onFormReset}
                    className="ml-4 text-sm text-gray-600 underline"
                >
                    Отменить редактирование
                </button>
            )}

            {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
        </form>
    );
}
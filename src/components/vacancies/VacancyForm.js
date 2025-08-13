import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function VacancyForm({ initialData, onVacancyAdded, onFormReset, onClose }) {
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
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title ?? "",
                location: initialData.location ?? "",
                work_format: initialData.work_format ?? "",
                skills: initialData.skills ?? "",
                salary_expectation: initialData.salary_expectation ?? "",
                tasks: initialData.tasks ?? "",
                kpi: initialData.kpi ?? "",
                approved: Boolean(initialData.approved),
            });
            setEditingId(initialData.id ?? null);
        } else {
            setEditingId(null);
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
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const resetForm = () => {
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
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const { id: _omit, ...payload } = formData;

        try {
            if (editingId) {
                const { data, error } = await supabase
                    .from("vacancies")
                    .update(payload)
                    .eq("id", editingId)
                    .select()
                    .single(); // получаем обновлённую запись

                if (error) throw error;
                onVacancyAdded?.(data); // передаём наверх сохранённую запись
            } else {
                const { data, error } = await supabase
                    .from("vacancies")
                    .insert([payload])
                    .select()
                    .single(); // получаем созданную запись

                if (error) throw error;
                onVacancyAdded?.(data);
            }

            resetForm();
            onFormReset?.();
            onClose?.();
        } catch (err) {
            console.error(err);
            setMessage("Ошибка при сохранении");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        resetForm();
        onFormReset?.();
        onClose?.();
    };

    return (
        <div className="relative">
            {onClose && (
                <button
                    type="button"
                    aria-label="Закрыть"
                    onClick={handleCancel}
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                    title="Закрыть"
                >
                    ×
                </button>
            )}

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
                <h2 className="text-xl font-semibold mb-4">
                    {editingId ? "Редактировать вакансию" : "Добавить вакансию"}
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
                        rows={3}
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

                <div className="mt-4">
                    <label className="block mb-2 font-medium">Задачи</label>
                    <textarea
                        name="tasks"
                        value={formData.tasks}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows={4}
                        placeholder="Опишите основные задачи на позиции"
                    />
                </div>

                <div className="mt-4">
                    <label className="block mb-2 font-medium">KPI</label>
                    <textarea
                        name="kpi"
                        value={formData.kpi}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows={4}
                        placeholder="Опишите KPI/метрики успешности"
                    />
                </div>

                <label className="block mb-4 mt-4">
                    <input
                        type="checkbox"
                        name="approved"
                        checked={formData.approved}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    Согласовано с рекрутером
                </label>

                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? "Сохраняю..." : "Сохранить"}
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="text-sm text-gray-600 underline"
                    >
                        {editingId ? "Отменить редактирование" : "Закрыть"}
                    </button>
                </div>

                {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
            </form>
        </div>
    );
}
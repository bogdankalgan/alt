import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function ProfileForm({ onSuccess, existing, onCancel }) {
    const [form, setForm] = useState({
        department: "",
        hard_skills: "",
        experience: "",
        tools: "",
        kpi: "",
    });

    useEffect(() => {
        if (existing) setForm(existing);
    }, [existing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (existing) {
            await supabase.from("department_profiles").update(form).eq("id", existing.id);
        } else {
            await supabase.from("department_profiles").insert([form]);
        }
        onSuccess();
        setForm({ department: "", hard_skills: "", experience: "", tools: "", kpi: "" });
        onCancel?.();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
            <div className="grid grid-cols-2 gap-4">
                <input
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="Название отдела"
                    className="border p-2 rounded"
                    required
                />
                <input
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="Опыт в годах"
                    type="number"
                    className="border p-2 rounded"
                    required
                />
                <input
                    value={form.hard_skills}
                    onChange={(e) => setForm({ ...form, hard_skills: e.target.value })}
                    placeholder="Hard skills"
                    className="border p-2 rounded"
                />
                <input
                    value={form.tools}
                    onChange={(e) => setForm({ ...form, tools: e.target.value })}
                    placeholder="Инструменты и методологии"
                    className="border p-2 rounded"
                />
                <textarea
                    value={form.kpi}
                    onChange={(e) => setForm({ ...form, kpi: e.target.value })}
                    placeholder="KPI и задачи"
                    className="border p-2 rounded col-span-2"
                />
            </div>
            <div className="mt-4 flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                    {existing ? "Сохранить" : "Добавить"}
                </button>
                {existing && (
                    <button type="button" className="text-gray-500" onClick={onCancel}>
                        Отмена
                    </button>
                )}
            </div>
        </form>
    );
}
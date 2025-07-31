import { supabase } from "../../supabaseClient";

export default function ProfileCard({ profile, onEdit, onDelete }) {
    const handleDelete = async () => {
        if (confirm("Удалить профиль?")) {
            await supabase.from("department_profiles").delete().eq("id", profile.id);
            onDelete();
        }
    };

    return (
        <div className="p-4 border rounded bg-white shadow">
            <h2 className="font-bold text-lg mb-1">{profile.department}</h2>
            <p><strong>Опыт:</strong> {profile.experience} лет</p>
            <p><strong>Навыки:</strong> {profile.hard_skills}</p>
            <p><strong>Инструменты:</strong> {profile.tools}</p>
            <p><strong>KPI:</strong> {profile.kpi}</p>
            <div className="mt-2 flex gap-2">
                <button
                    className="bg-yellow-400 text-black px-3 py-1 rounded"
                    onClick={() => onEdit(profile)}
                >
                    Редактировать
                </button>
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={handleDelete}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
}
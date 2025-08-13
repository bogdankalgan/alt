import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function CandidateForm({ candidate = {}, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        full_name: candidate.full_name || "",
        birthdate: candidate.birthdate || "",
        gender: candidate.gender || "",
        education: candidate.education || "",
        experience: candidate.experience || "",
        skills: candidate.skills || "",
        feedback: candidate.feedback || "",
        status: candidate.status || "приглашён",
        photo_url: candidate.photo_url || "",
        resume: candidate.resume || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (e, field, bucket) => {
        const file = e.target.files[0];
        if (!file) return;

        const filename = `${Date.now()}_${file.name}`;
        const { error } = await supabase.storage.from(bucket).upload(filename, file);

        if (error) return alert("Ошибка загрузки: " + error.message);

        const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
        setFormData((prev) => ({ ...prev, [field]: data.publicUrl }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded p-6 shadow space-y-4">
            <h2 className="text-xl font-semibold">Форма кандидата</h2>

            <input name="full_name" value={formData.full_name} onChange={handleChange} placeholder="ФИО" className="input" required />
            <input name="birthdate" type="date" value={formData.birthdate} onChange={handleChange} className="input" required />
            <select name="gender" value={formData.gender} onChange={handleChange} className="input" required>
                <option value="">Пол</option>
                <option value="мужской">мужской</option>
                <option value="женский">женский</option>
            </select>
            <input name="education" value={formData.education} onChange={handleChange} placeholder="Образование" className="input" />
            <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Опыт" className="input" />
            <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Навыки" className="input" />
            <textarea name="feedback" value={formData.feedback} onChange={handleChange} placeholder="Отзывы кандидата о компании" className="input" />

            <select name="status" value={formData.status} onChange={handleChange} className="input">
                <option value="приглашён">приглашён</option>
                <option value="тестирование">тестирование</option>
                <option value="архив">архив</option>
                <option value="чёрный список">чёрный список</option>
            </select>

            <div>
                <label>Фото:</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "photo_url", "candidates")} />
                {formData.photo_url && <img src={formData.photo_url} alt="Фото" className="h-32 mt-2" />}
            </div>

            <div>
                <label>Резюме:</label>
                <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, "resume", "candidates")} />
                {formData.resume && (
                    <a href={formData.resume} target="_blank" rel="noreferrer" className="text-blue-600 underline block mt-1">
                        Открыть резюме
                    </a>
                )}
            </div>

            <div className="flex gap-4 mt-4">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Сохранить</button>
                <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Отмена</button>
            </div>
        </form>
    );
}
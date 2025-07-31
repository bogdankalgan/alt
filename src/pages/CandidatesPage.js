import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import CandidateCard from "../components/candidates/CandidateCard";
import CandidateForm from "../components/candidates/CandidateForm";
import CandidateDetails from "../components/candidates/CandidateDetails";
import CandidateStatusControls from "../components/candidates/CandidateStatusControls";
import CommentsSection from "../components/candidates/CommentsSection";
import StageHistory from "../components/candidates/StageHistory";

export default function CandidatesPage() {
    const [candidates, setCandidates] = useState([]);
    const [selected, setSelected] = useState(null);
    const [editing, setEditing] = useState(null);

    const fetchCandidates = async () => {
        const { data, error } = await supabase.from("candidates").select("*").order("id", { ascending: false });
        if (error) alert("Ошибка загрузки: " + error.message);
        else setCandidates(data);
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    const handleSave = async (candidate) => {
        const { error } = editing?.id
            ? await supabase.from("candidates").update(candidate).eq("id", editing.id)
            : await supabase.from("candidates").insert([candidate]);

        if (error) return alert("Ошибка при сохранении: " + error.message);
        setEditing(null);
        setSelected(null);
        fetchCandidates();
    };

    const handleDelete = async (id) => {
        await supabase.from("candidates").delete().eq("id", id);
        setSelected(null);
        fetchCandidates();
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Кандидаты</h1>
                <button onClick={() => { setEditing({}); setSelected(null); }} className="bg-blue-600 text-white px-4 py-2 rounded">
                    + Добавить кандидата
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {candidates.map((c) => (
                    <div key={c.id} onClick={() => { setSelected(c); setEditing(null); }} className="cursor-pointer">
                        <CandidateCard candidate={c} />
                    </div>
                ))}
            </div>

            <div>
                {editing && <CandidateForm candidate={editing} onSave={handleSave} onCancel={() => setEditing(null)} />}
                {selected && !editing && (
                    <>
                        <CandidateDetails candidate={selected} />
                        <CandidateStatusControls candidate={selected} onStatusChange={fetchCandidates} />
                        <CommentsSection candidateId={selected.id} />
                        <StageHistory candidateId={selected.id} />
                        <button onClick={() => setSelected(null)} className="mt-4 text-sm text-blue-600">← Назад</button>
                    </>
                )}
            </div>
        </div>
    );
}
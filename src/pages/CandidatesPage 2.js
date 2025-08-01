import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient";
import CandidateCard from "../components/candidates/CandidateCard"
import CandidateForm from "../components/candidates/CandidateForm";
import CandidateDetails from "../components/candidates/CandidateDetails";

export default function CandidatesPage() {
    const [candidates, setCandidates] = useState([]);
    const [selected, setSelected] = useState(null)
    const [editing, setEditing] = useState(false)

    const fetchCandidates = async () => {
        const {data, error} = await supabase.from('candidates').select('*').order('id', {ascending: false})
        if(error) alert("Ошибка загрузки", error.message)
        else setCandidates(data)
    }

    useEffect(() => {
        fetchCandidates()
    }, []);

    const handleSave = async (candidate) => {
        const {error} = editing ? await supabase.from('candidates').update(candidate).eq('id', editing.id) : await supabase.from('candidates').insert([candidate]);

        if(error) return alert("Ошибка при сохранении кандадата")
        fetchCandidates()
        setEditing(null)
        setSelected(null)
    }

    const handleDelete = async (id) => {
        await supabase.from("candidates").delete().eq('id', id)
        fetchCandidates()
        setSelected(null)
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Кандидаты</h1>

            <div className="flex gap-6">
                <button onClick={() => {setEditing({}); setSelected(null)}} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Добавить кандидата
                </button>

                {candidates.map((c) => (
                    <div key={c.id} onClick={() => { setSelected(c); setEditing(null); }} className="cursor-pointer">
                        <CandidateCard candidate={c} />
                    </div>
                ))}

                <div className="flex-1">
                    {editing ? (
                        <CandidateForm initialData={editing} onSave={handleSave()} onCancel={() => setEditing(null)}/>
                    ) : selected ? (
                        <CandidateDetails candidate={selected} onEdit={setEditing()} onDelete={handleDelete()}/>
                    ) : (
                        <p className="text-gray-500">Выберите кандидата или добавьте нового"></p>
                    )}
                </div>
            </div>
        </div>
    )
}
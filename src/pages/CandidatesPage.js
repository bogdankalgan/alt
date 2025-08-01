import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import CandidateList from "../components/candidates/CandidateList";
import CandidateDetails from "../components/candidates/CandidateDetails";
import MainLayout from "../layout/MainLayout";

export default function CandidatesPage() {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const fetchCandidates = async () => {
        const { data, error } = await supabase.from("candidates").select("*").order("created_at", { ascending: false });
        if (!error) setCandidates(data);
        else alert("Ошибка загрузки кандидатов: " + error.message);
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    return (
        <MainLayout className="flex h-full">
            <div className="w-1/3 border-r overflow-y-auto">
                <CandidateList
                    candidates={candidates}
                    onSelect={(c) => setSelectedCandidate(c)}
                    selectedId={selectedCandidate?.id}
                />
            </div>
            <div className="flex-1 overflow-y-auto p-6">
                {selectedCandidate ? (
                    <CandidateDetails candidate={selectedCandidate} onChange={fetchCandidates} />
                ) : (
                    <div className="text-gray-500">Выберите кандидата из списка</div>
                )}
            </div>
        </MainLayout>
    );
}
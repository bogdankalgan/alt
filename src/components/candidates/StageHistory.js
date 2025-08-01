import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../supabaseClient";

export default function StageHistory({ candidateId }) {
    const [history, setHistory] = useState([]);

    const fetchHistory = useCallback(async () => {
        const { data, error } = await supabase
            .from("candidates")
            .select("history")
            .eq("id", candidateId)
            .single();
        if (error) return alert("Ошибка загрузки истории: " + error.message);
        setHistory(data.history || []);
    }, [candidateId]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    return (
        <div className="bg-white p-4 rounded shadow mt-6">
            <h3 className="font-semibold text-lg mb-2">История этапов</h3>

            {history.length === 0 ? (
                <p className="text-sm text-gray-400">Этапы не заданы.</p>
            ) : (
                <ul className="text-sm space-y-2">
                    {history.map((step, index) => (
                        <li key={index} className="border-b pb-1">
                            <div className="font-medium">{step.title}</div>
                            <div className="text-xs text-gray-500">
                                {new Date(step.timestamp).toLocaleString()}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
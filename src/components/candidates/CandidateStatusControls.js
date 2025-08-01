import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function CandidateStatusControls({ candidate, onChange }) {
    const [loading, setLoading] = useState(false);

    const updateField = async (fields) => {
        setLoading(true);
        const { error } = await supabase
            .from("candidates")
            .update(fields)
            .eq("id", candidate.id);
        setLoading(false);
        if (error) alert("Ошибка обновления: " + error.message);
        else onChange?.();
    };

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Статус кандидата</h3>

            <div className="flex gap-2 flex-wrap">
                {["приглашён", "тестирование", "архив", "чёрный список"].map((status) => (
                    <button
                        key={status}
                        disabled={loading}
                        onClick={() => updateField({ status })}
                        className={`px-3 py-1 rounded text-sm ${
                            candidate.status === status
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="flex gap-4">
                <button
                    disabled={candidate.offer_sent || loading}
                    onClick={() => updateField({ offer_sent: true })}
                    className={`px-4 py-2 rounded text-sm ${
                        candidate.offer_sent
                            ? "bg-green-200 text-gray-600"
                            : "bg-green-600 text-white"
                    }`}
                >
                    {candidate.offer_sent ? "Оффер отправлен" : "Отправить оффер"}
                </button>

                <button
                    disabled={candidate.welcome_book_sent || loading}
                    onClick={() => updateField({ welcome_book: true })}
                    className={`px-4 py-2 rounded text-sm ${
                        candidate.welcome_book_sent
                            ? "bg-purple-200 text-gray-600"
                            : "bg-purple-600 text-white"
                    }`}
                >
                    {candidate.welcome_book_sent ? "Welcome-book отправлен" : "Отправить welcome-book"}
                </button>
            </div>
        </div>
    );
}
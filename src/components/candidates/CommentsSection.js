import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../supabaseClient";

export default function CommentsSection({ candidateId }) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    const fetchComments = useCallback(async () => {
        const { data, error } = await supabase
            .from("candidates")
            .select("comments")
            .eq("id", candidateId)
            .single();
        if (error) return alert("Ошибка загрузки комментариев: " + error.message);
        setComments(data.comments || []);
    }, [candidateId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleAddComment = async () => {
        if (!text.trim()) return;
        const newComment = {
            text,
            timestamp: new Date().toISOString(),
        };
        const updated = [...comments, newComment];

        const { error } = await supabase
            .from("candidates")
            .update({ comments: updated })
            .eq("id", candidateId);
        if (error) return alert("Ошибка добавления комментария: " + error.message);

        setText("");
        fetchComments();
    };

    return (
        <div className="bg-white p-4 rounded shadow mt-6 space-y-4">
            <h3 className="font-semibold text-lg">Комментарии</h3>

            <div className="space-y-2 max-h-48 overflow-y-auto">
                {comments.length === 0 && (
                    <p className="text-sm text-gray-400">Комментариев пока нет.</p>
                )}
                {comments.map((c, idx) => (
                    <div key={idx} className="border-b pb-1 text-sm">
                        <div>{c.text}</div>
                        <div className="text-xs text-gray-400">
                            {new Date(c.timestamp).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Добавить комментарий..."
                    className="flex-1 border px-3 py-1 rounded text-sm"
                />
                <button
                    onClick={handleAddComment}
                    className="bg-blue-600 text-white px-4 py-1 text-sm rounded"
                >
                    Добавить
                </button>
            </div>
        </div>
    );
}
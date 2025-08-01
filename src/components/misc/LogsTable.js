import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function LogsTable() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const { data, error } = await supabase
                .from("logs")
                .select("*")
                .order("timestamp", { ascending: false });

            if (!error) setLogs(data);
        };

        fetchLogs();
    }, []);

    return (
        <div className="overflow-auto border rounded-md">
            <table className="min-w-full table-auto text-left">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-2">Дата</th>
                    <th className="p-2">Пользователь</th>
                    <th className="p-2">Действие</th>
                </tr>
                </thead>
                <tbody>
                {logs.map(log => (
                    <tr key={log.id} className="border-t">
                        <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
                        <td className="p-2">{log.user}</td>
                        <td className="p-2">{log.action}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
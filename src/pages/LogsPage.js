import React from "react";
import LogsTable from "../components/misc/LogsTable";

export default function LogsPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Логи действий</h1>
            <LogsTable />
        </div>
    );
}
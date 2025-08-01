import React from "react";
import * as XLSX from "xlsx";

const ExportEventsButton = ({ events }) => {
    const exportToExcel = () => {
        const data = events.map((e) => ({
            Тип: e.type,
            Сотрудник: e.employee_name,
            Ребёнок: e.child_name || "",
            Дата: e.event_date,
            НапоминатьЗа: e.remind_before,
            Статус: e.is_done ? "Завершено" : "Ожидает",
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Events");
        XLSX.writeFile(workbook, "events.xlsx");
    };

    return (
        <button onClick={exportToExcel} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            📤 Выгрузить в Excel
        </button>
    );
};

export default ExportEventsButton;
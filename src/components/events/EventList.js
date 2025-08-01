import React from "react";
import {supabase} from "../../supabaseClient";
import dayjs from "dayjs";

const EventList = ({ events, onRefresh }) => {
    const markDone = async (id) => {
        await supabase.from("events").update({ is_done: true }).eq("id", id);
        onRefresh();
    };

    const moveDate = async (id, newDate) => {
        await supabase.from("events").update({ event_date: newDate }).eq("id", id);
        onRefresh();
    };

    return (
        <div>
            <h2 className="text-xl font-semibold">Список событий</h2>
            <table className="w-full mt-2 border text-sm">
                <thead>
                <tr className="bg-gray-100">
                    <th>Тип</th>
                    <th>Сотрудник</th>
                    <th>Ребёнок</th>
                    <th>Дата</th>
                    <th>Напоминать за</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {events.map((e) => (
                    <tr key={e.id} className="text-center border-t">
                        <td>{e.type}</td>
                        <td>{e.employee_name}</td>
                        <td>{e.child_name || "-"}</td>
                        <td>{dayjs(e.event_date).format("DD.MM.YYYY")}</td>
                        <td>{e.remind_before} дней</td>
                        <td>{e.is_done ? "✅" : "⏳"}</td>
                        <td>
                            <button
                                className="text-green-600 underline mr-2"
                                onClick={() => markDone(e.id)}
                            >
                                Завершить
                            </button>
                            <button
                                className="text-blue-600 underline"
                                onClick={() =>
                                    moveDate(e.id, prompt("Новая дата (YYYY-MM-DD):", e.event_date))
                                }
                            >
                                Перенести
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventList;
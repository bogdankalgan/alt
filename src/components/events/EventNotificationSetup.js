import React, { useState } from "react";
import  {supabase} from "../../supabaseClient";

const EventNotificationSetup = ({ onRefresh }) => {
    const [form, setForm] = useState({
        type: "birthday",
        employee_name: "",
        child_name: "",
        event_date: "",
        remind_before: 3,
    });

    const submit = async () => {
        await supabase.from("events").insert([form]);
        setForm({ type: "birthday", employee_name: "", child_name: "", event_date: "", remind_before: 3 });
        onRefresh();
    };

    return (
        <div className="space-y-2 border p-4 rounded">
            <h2 className="text-xl font-semibold">Добавить событие</h2>
            <div className="flex flex-col gap-2">
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option value="birthday">День рождения</option>
                    <option value="child_birthday">ДР ребёнка</option>
                    <option value="work_anniversary">Годовщина работы</option>
                </select>
                <input type="text" placeholder="Имя сотрудника" value={form.employee_name} onChange={(e) => setForm({ ...form, employee_name: e.target.value })} />
                {form.type === "child_birthday" && (
                    <input type="text" placeholder="Имя ребёнка" value={form.child_name} onChange={(e) => setForm({ ...form, child_name: e.target.value })} />
                )}
                <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
                <input type="number" placeholder="За сколько дней напоминать" value={form.remind_before} onChange={(e) => setForm({ ...form, remind_before: e.target.value })} />
                <button onClick={submit} className="bg-blue-600 text-white px-4 py-1 rounded">Сохранить</button>
            </div>
        </div>
    );
};

export default EventNotificationSetup;
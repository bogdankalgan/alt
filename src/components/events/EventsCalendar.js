import React from "react";
import dayjs from "dayjs";

const EventsCalendar = ({ events }) => {
    const grouped = events.reduce((acc, ev) => {
        const month = dayjs(ev.event_date).format("MMMM YYYY");
        if (!acc[month]) acc[month] = [];
        acc[month].push(ev);
        return acc;
    }, {});

    return (
        <div>
            <h2 className="text-xl font-semibold">Календарь событий</h2>
            {Object.entries(grouped).map(([month, evs]) => (
                <div key={month} className="mt-4">
                    <h3 className="text-lg font-bold">{month}</h3>
                    <ul className="ml-4 list-disc">
                        {evs.map((e) => (
                            <li key={e.id}>
                                📌 {e.type === "birthday" && "ДР сотрудника"}
                                {e.type === "child_birthday" && "ДР ребёнка"}
                                {e.type === "work_anniversary" && "Годовщина"} — {e.employee_name} (
                                {dayjs(e.event_date).format("DD.MM.YYYY")})
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default EventsCalendar;
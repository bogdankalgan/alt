export default function VacancyCard({ vacancy }) {
    const {
        title,
        location,
        work_format,
        skills,
        salary_expectation,
        tasks,
        kpi,
        approved,
    } = vacancy;

    return (
        <div className="p-4 border rounded shadow bg-white">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{location} — {work_format}</p>

            <div className="mt-2 text-sm">
                <p><strong>Навыки:</strong> {skills}</p>
                <p><strong>Ожидания:</strong> {salary_expectation}</p>
                <p><strong>Задачи:</strong> {tasks}</p>
                <p><strong>KPI:</strong> {kpi}</p>
                <p><strong>Согласовано:</strong> {approved ? "Да" : "Нет"}</p>
            </div>
        </div>
    );
}
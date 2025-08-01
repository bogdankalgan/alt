export default function AnalyticsTable({ data }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Таблица данных</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Этап</th>
                    <th className="border px-4 py-2">Кол-во кандидатов</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row) => (
                    <tr key={row.name}>
                        <td className="border px-4 py-2">{row.name}</td>
                        <td className="border px-4 py-2 text-center">{row.count}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default  function EmployeeTable({employees, onEdit, onDelete, sortField, setSortField, sortAsc, setSortAsc}) {
    const toggleSort = (field) => {
        if(sortField === field) setSortAsc(!sortAsc)
        else {
            setSortField(field);
            setSortAsc(true);
        }
    }

        return (
            <table className="w-full bg-white rounded shadow overflow-hidden text-left">
                <thead>
                    <tr className="bg-gray-100">
                        {["ФИО", "Должность", "Отдел", "Дата рождения", "Дата приема", "Хобби", "Дети"].map((label, i) => (
                            <th key={i} className="p-3 cursor-pointer" onClick={() => toggleSort(["full_name", "position", "department", "birth_date", "date_of_admission", "hobbies", "children"][i])}>
                                {label} {sortField === ["full_name", "position", "department", "birth_date", "date_of_admission", "hobbies", "children"][i] ? (sortAsc ? "▲" : "▼") : ""}
                            </th>
                            ))}
                        <th className="p-3">Действия</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id} className="border-t hover:bg-gray-50">
                            <td className="p-3">{emp.full_name}</td>
                            <td className="p-3">{emp.position}</td>
                            <td className="p-3">{emp.departament}</td>
                            <td className="p-3">{emp.birthdate}</td>
                            <td className="p-3">{emp.hire_date}</td>
                            <td className="p-3">{emp.hobbies}</td>
                            <td className="p-3">{
                                Array.isArray(emp.childern) ? emp.childern.map((c, i) => `${c.name} (${c.birthdate})`).join(", ") : "-"}
                            </td>

                            <td className="p-3 space-x-3">
                                <button onClick={() => onEdit((emp))} className="text-blue-600">Изменить</button>
                                <button
                                    onClick={() => {
                                        if (window.confirm("Вы уверены, что хотите удалить этого сотрудника?")) {
                                            onDelete(emp.id);
                                        }
                                    }}
                                    className="text-red-500"
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )

}
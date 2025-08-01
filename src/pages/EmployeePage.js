import {useEffect, useState, useCallback} from "react";
import MainLayout from "../layout/MainLayout";
import {supabase} from "../supabaseClient";
import EmployeeTable from "../components/employess/EmployeeTable";
import EmployeeForm from "../components/employess/EmployeeForm";
import EmployeeImportExport from "../components/employess/EmployeeImportExport";


export default function EmployeePage() {
    const [employees, setEmployees] = useState([])
    const [search, setSearch] = useState("")
    const [sortField, setSortField] = useState("full_name")
    const [sortAsc, setSortAsc] = useState(true)
    const [editing, setEditing] = useState(null)

    const fetchEmployees = useCallback(async  () => {
        const {data, error} = await supabase.from("employees").select("*").order(sortField, {ascending: sortAsc})
        if(!error) setEmployees(data)
    }, [sortField, sortAsc])

    useEffect(() => {
        fetchEmployees()
    }, [fetchEmployees]);

    const handleSave = async (employee) => {
        const {id, ...rest} = employee
        const {error} = id ? await supabase.from("employees").update(rest).eq('id', id) : await supabase.from("employees").insert(rest)

        if(!error) {
            await fetchEmployees()
            setEditing(null)
        }
    }

    const handleDelete = async (id) => {
        const {error} = await supabase.from('employees').delete().eq('id', id)
        if(!error) {
            await fetchEmployees()
            if(editing?.id === id) setEditing(null)
        }
    }

    const filtered = employees.filter((emp) => emp.full_name.toLowerCase().includes(search.toLowerCase()))

    return (
        <MainLayout>
            <h1 className="text-2xl font-bold mb-6">Сотрудник</h1>

            <div className="flex justify-between mb-4">
                <input type="text" placeholder="Поиск по ФИО" value={search} onChange={(e) => setSearch(e.target.value)} className="border px-2 py-2 rounded w-1/3"/>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setEditing({})}>Добавить сотрудника</button>
            </div>

            {editing ? (
                <EmployeeForm initial={editing} onSave={handleSave} onCancel={() => setEditing(null)}/>
            ) : (
                <div>
                <EmployeeImportExport onImportFinish={fetchEmployees}/>
                <EmployeeTable employees={filtered} onEdit={setEditing} onDelete={handleDelete} sortField={sortField} setSortField={setSortField} sortAsc={sortAsc} setSortAsc={setSortAsc}/>
                </div>
            )}
        </MainLayout>
    )
}
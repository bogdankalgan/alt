import {useState, useEffect} from "react";
import ChildrenField from "./ChildrenField";

const departaments = ["Отдел продаж", "Маркетинг", "Разработка", "HR", "Финансы"]

export default function EmployeeForm({initial = {}, onSave, onCancel}) {
    const [loading, setLoading] = useState(null)

    const [form, setForm] = useState({
        full_name: "",
        position: "",
        departament: "",
        birthdate: "",
        hire_date: "",
        hobbies: "",
        children: []
    })

    useEffect(() => {
        if(initial?.id) setForm(initial)
    }, [initial]);

    const update = (e) => {
        setForm((f) => ({...f, [e.target.name]: e.target.value}))
    }

    const submit = (e) => {
        e.preventDefault()
        if(loading) return
        if(!form.full_name) return alert("ФИО обазательно")

        setLoading(true)
        onSave({...form, id: initial.id})
        setLoading(false)
    }

    return (
        <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <input name="full_name" value={form.full_name} onChange={update} className="border p-2 rounded" placeholder="ФИО"/>
                <input name="position" value={form.position} onChange={update} className="border p-2 rounded" placeholder="Должность"/>
                <select name="departament" value={form.departament} onChange={update} className="border p-2 rounded">
                    <option value="">Выберете отдел</option>
                    {departaments.map((dep) => <option key={dep} value={dep}>{dep}</option>)}
                </select>
                <div className="col-span-2">
                    <label className="text-sm text-gray-600">Дата рождения</label>
                    <input type="date" name="birthdate" value={form.birthdate} onChange={update} className="border p-2 rounded"/>
                </div>


                <div className="col-span-2">
                    <label className="text-sm text-gray-600">Дата устройства на работу</label>
                    <input type="date" name="hire_date" value={form.hire_date} onChange={update} className="border p-2 rounded"/>
                </div>
                <input type="text" name="hobbies" value={form.hobbies} onChange={update} className="border p-2 rounded" placeholder="Хобби"/>
            </div>

            <ChildrenField children={form.children} setChildren={(children) => setForm((f) => ({ ...f, children }))} />

            <div className="flex gap-2">
                <button type="submit" disabled={loading} className={`px-4 py-2 rounded text-white ${loading ? "bg-blue-300" : "bg-blue-500"}`}>{loading ? "Сохранение..." : "Сохранить"}</button>
                <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Отмена</button>
            </div>
        </form>
    )
}
import {useState, useEffect} from "react";
import ChildrenField from "./ChildrenField";

const departaments = ["Отдел продаж", "Маркетинг", "Разработка", "HR", "Финансы"]

export default function EmployeeForm({initial = {}, onSave, onCancel}) {
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
        if(!form.full_name) return alert("ФИО обазательно")
        onSave({...form, id: initial.id})
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
                <input type="date" name="birthdate" value={form.birthdate} onChange={update} className="border p-2 rounded"/>
                <input type="date" name="hire_date" value={form.hire_date} onChange={update} className="border p-2 rounded"/>
                <input type="text" name="hobbies" value={form.hobbies} onChange={update} className="border p-2 rounded" placeholder="Хобби"/>
            </div>

            <ChildrenField children={form.children} setChildren={(children) => setForm((f) => ({ ...f, children }))} />

            <div className="flex gap-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Сохранить</button>
                <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Отмена</button>
            </div>
        </form>
    )
}
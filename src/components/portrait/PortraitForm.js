import {useState} from "react";

export default function PortraitForm({onSave, defaultValues }) {
    const safeDefaults = defaultValues || {}

    const [softSkills, setSoftSkills] = useState(safeDefaults.softSkills || "")
    const [redFlags, setRedFlags] = useState(safeDefaults.redFlags || "")
    const [comment, setComment] = useState(safeDefaults.comment || "")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave({
            softSkills,
            redFlags,
            comment
        })
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
            <div>
                <label className="block font-medium">Желаемые качества</label>
                <textarea value={softSkills} onChange={e => setSoftSkills(e.target.value)} className="w-full border rounded p-2"/>
            </div>

            <div>
                <label className="block font-medium">Нежелаемые качества</label>
                <textarea value={redFlags} onChange={e => setRedFlags(e.target.value)} className="w-full border rounded p-2"/>
            </div>

            <div>
                <label className="block font-medium">Коментарий</label>
                <textarea value={comment} onChange={e => setComment(e.target.value)} className="w-full border rounded p-2"/>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Сохранить</button>
        </form>
    )
}
import {useEffect, useState} from "react";
import MainLayout from "../layout/MainLayout";
import PortraitForm from "../components/portrait/PortraitForm"
import {supabase} from "../supabaseClient";

export default function PortraitPage() {
    const [portrait, setPortrait] = useState(null)

    const fetchPortrait = async () => {
        const { data, error } = await supabase
            .from("portraits")
            .select("*")
            .order("id", { ascending: false })
            .limit(1)


        if (error) {
            return
        }

        if (data && data.length > 0) {
            setPortrait(data[0])
        } else {
            console.log("Портретов нет")
        }
    }

    useEffect(() => {
        fetchPortrait()
    }, []);

    const handleSave = async (formData) => {
        let error
        if(portrait?.id) {
            ({error} = await supabase.from("portraits").update(formData).eq("id", portrait.id))
        } else {
            const result = await supabase.from("portraits").insert([formData])
            error = result.error
        }

        if(error) {
            alert("Ошибка при сохранении")
        } else  {
            fetchPortrait()
        }
    }

    const handleDelete = async () => {
        const {error} = await supabase.from("portraits").delete().eq("id", portrait.id)
        if(!error) setPortrait(null)
    }

    return (
        <MainLayout>
            <h1 className="bg-white font-bold mb-6">Портрет идельного сотрудника</h1>

            {portrait ? (
                <div className="bg-white p-4 rounded shadow mb-6">
                    <h2 className="text-xl font-semibold mb-2">Текущий портрет</h2>
                    <p><strong>Soft skills:</strong> {portrait.softSkills}</p>
                    <p><strong>Red flags:</strong> {portrait.redFlags}</p>
                    <p><strong>Комментарий:</strong> {portrait.comment}</p>

                    <button
                        onClick={handleDelete}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Удалить
                    </button>
                </div>
            ) : (
                <p className="text-gray-600 mb-4">Портрет не создан</p>
            )}
            <PortraitForm onSave={handleSave} defaultValues={portrait}/>
        </MainLayout>
    )
}
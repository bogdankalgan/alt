import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ProfileForm from "../components/departments/ProfileForm";
import ProfileList from "../components/departments/ProfileList";
import MainLayout from "../layout/MainLayout";

export default function DepartmentProfilesPage() {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const fetchProfiles = async () => {
        const { data } = await supabase.from("department_profiles").select("*");
        setProfiles(data || []);
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    return (
        <MainLayout className="p-6">
            <h1 className="text-2xl font-bold mb-4">Профили специалистов по отделам</h1>
            <ProfileForm
                onSuccess={fetchProfiles}
                existing={selectedProfile}
                onCancel={() => setSelectedProfile(null)}
            />
            <ProfileList
                profiles={profiles}
                onEdit={setSelectedProfile}
                onDelete={fetchProfiles}
            />
        </MainLayout>
    );
}
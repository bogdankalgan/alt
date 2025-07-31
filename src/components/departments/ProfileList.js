import ProfileCard from "./ProfileCard";

export default function ProfileList({ profiles, onEdit, onDelete }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profiles.map((profile) => (
                <ProfileCard
                    key={profile.id}
                    profile={profile}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
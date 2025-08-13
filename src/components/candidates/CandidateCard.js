export default function CandidateCard({ candidate }) {
    return (
        <div className="bg-white rounded shadow p-4 hover:shadow-md transition">
            {candidate.photo_url && (
                <img
                    src={candidate.photo_url}
                    alt={candidate.full_name}
                    className="w-full h-48 object-cover rounded mb-4"
                />
            )}
            <h2 className="text-lg font-semibold">{candidate.full_name}</h2>
            <p className="text-sm text-gray-600">Пол: {candidate.gender}</p>
            <p className="text-sm text-gray-600">Дата рождения: {candidate.birthdate}</p>
            <p className="text-sm text-gray-600">Образование: {candidate.education}</p>
            <p className="text-sm text-gray-600">Опыт: {candidate.experience}</p>
            <p className="text-sm text-gray-600">Навыки: {candidate.skills}</p>
            <p className="mt-2 inline-block text-xs bg-gray-100 px-2 py-1 rounded">
                Статус: {candidate.status || "не указан"}
            </p>
        </div>
    );
}
export default function CandidateCard({candidate}) {
    return (
        <div className="border px-4 rounded shadow hover:shadow-md bg-white">
            <h2 className="text-lg font-semibold">{candidate.full_name}</h2>
            <p className="text-sm text-gray-600">Статус: {candidate.status}</p>
            <p className="text-sm text-gray-600">Должность: {candidate.position}</p>
            <p className="text-sm text-gray-600">Дата рождения: {candidate.birthdate}</p>
        </div>
    )
}
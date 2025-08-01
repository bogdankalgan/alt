import CandidateStatusControls from "./CandidateStatusControls";
import CommentsSection from "./CommentsSection";
import StageHistory from "./StageHistory";
import TestResultViewer from "../tests/TestResultViewer";

export default function CandidateDetails({ candidate, onChange }) {
    return (
        <div className="space-y-6">
            <div className="flex items-start gap-6">
                {candidate.photo_url && (
                    <img
                        src={candidate.photo_url}
                        alt={candidate.full_name}
                        className="w-40 h-40 object-cover rounded shadow"
                    />
                )}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{candidate.full_name}</h2>
                    <p><strong>Пол:</strong> {candidate.gender}</p>
                    <p><strong>Дата рождения:</strong> {candidate.birthdate}</p>
                    <p><strong>Образование:</strong> {candidate.education}</p>
                    <p><strong>Опыт:</strong> {candidate.experience}</p>
                    <p><strong>Навыки:</strong> {candidate.skills}</p>
                </div>
            </div>

            {candidate.feedback && (
                <div>
                    <h3 className="font-semibold mb-1">Отзыв кандидата:</h3>
                    <p className="text-gray-800 bg-gray-50 p-3 rounded">{candidate.feedback}</p>
                </div>
            )}

            {candidate.resume && (
                <div>
                    <a
                        href={candidate.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                    >
                        📄 Открыть резюме
                    </a>
                </div>
            )}

            {candidate.test_results && (
                <div>
                    <h3 className="font-semibold mb-1">Результаты тестов:</h3>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {JSON.stringify(candidate.test_results, null, 2)}
          </pre>
                </div>
            )}

            <CandidateStatusControls candidate={candidate} onChange={onChange} />
            <CommentsSection candidateId={candidate.id} />
            <StageHistory candidateId={candidate.id} />
            <TestResultViewer testResults={candidate.test_results || []}/>
        </div>
    );
}
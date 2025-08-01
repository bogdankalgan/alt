import CandidateListItem from "./CandidateListItem";

export default function CandidateList({ candidates, onSelect, selectedId }) {
    return (
        <div className="p-4 space-y-2">
            <h2 className="text-lg font-bold mb-4">Кандидаты</h2>
            {candidates.map((c) => (
                <CandidateListItem
                    key={c.id}
                    candidate={c}
                    active={selectedId === c.id}
                    onClick={() => onSelect(c)}
                />
            ))}
        </div>
    );
}
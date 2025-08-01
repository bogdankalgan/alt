import React from 'react';

const TestList = ({ tests, onEdit, onDelete, onReorder }) => {
    const handleMove = (index, direction) => {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= tests.length) return;

        const reordered = [...tests];
        const temp = reordered[index];
        reordered[index] = reordered[newIndex];
        reordered[newIndex] = temp;

        // Обновляем порядок
        reordered.forEach((t, i) => (t.sort_order = i + 1));
        onReorder(reordered);
    };

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Список тестов</h2>
            <ul className="space-y-2">
                {tests
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((test, index) => (
                        <li key={test.id} className="border p-3 rounded flex justify-between items-center">
                            <div>
                                <div className="font-semibold">{test.title}</div>
                                <div className="text-sm text-gray-600">
                                    Тип: {test.type} | Формат: {test.result_format}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleMove(index, -1)} className="btn btn-light">↑</button>
                                <button onClick={() => handleMove(index, 1)} className="btn btn-light">↓</button>
                                <button onClick={() => onEdit(test)} className="btn btn-primary">✏️</button>
                                <button onClick={() => onDelete(test.id)} className="btn btn-danger">🗑️</button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default TestList;
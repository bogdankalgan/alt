import React from 'react';
import {DragDropContext, Droppable, Draggable} from "@hello-pangea/dnd";

const TestList = ({ tests, onEdit, onDelete, onReorder }) => {
    const handleMove = (index, direction) => {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= tests.length) return;

        const reordered = [...tests];
        const temp = reordered[index];
        reordered[index] = reordered[newIndex];
        reordered[newIndex] = temp;

        reordered.forEach((t, i) => (t.sort_order = i + 1));
        onReorder(reordered);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reordered = [...tests];
        const [removed] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, removed);

        reordered.forEach((t, i) => (t.sort_order = i + 1));
        onReorder(reordered);
    };

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Список тестов</h2>
            {/*<ul className="space-y-2">
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
            </ul>*/}

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="testList">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                            {tests
                                .sort((a, b) => a.sort_order - b.sort_order)
                                .map((test, index) => (
                                    <Draggable key={test.id} draggableId={String(test.id)} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="border p-3 rounded flex justify-between items-center bg-white"
                                            >
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
                                        )}
                                    </Draggable>
                                ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default TestList;
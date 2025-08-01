import React, { useState } from 'react';

const TestForm = ({ onSave, onCancel, initialData = {} }) => {
    const [formData, setFormData] = useState({
        title: '',
        type: 'DISC',
        link: '',
        result_format: 'text',
        sort_order: 1,
        ...initialData,
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
            <div>
                <label className="block">Название теста</label>
                <input name="title" value={formData.title} onChange={handleChange} className="input" required />
            </div>
            <div>
                <label className="block">Тип теста</label>
                <select name="type" value={formData.type} onChange={handleChange} className="input">
                    <option value="DISC">DISC</option>
                    <option value="Адизес">Адизес</option>
                    <option value="Свой">Свой</option>
                </select>
            </div>
            <div>
                <label className="block">Ссылка на тест</label>
                <input name="link" value={formData.link} onChange={handleChange} className="input" />
            </div>
            <div>
                <label className="block">Формат результата</label>
                <select name="result_format" value={formData.result_format} onChange={handleChange} className="input">
                    <option value="text">Текст</option>
                    <option value="screenshot">Скриншот</option>
                    <option value="auto">Авто</option>
                </select>
            </div>
            <div>
                <label className="block">Порядок</label>
                <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} className="input" />
            </div>
            <div className="flex gap-4">
                <button type="submit" className="btn btn-primary">Сохранить</button>
                <button type="button" onClick={onCancel} className="btn btn-secondary">Отмена</button>
            </div>
        </form>
    );
};

export default TestForm;
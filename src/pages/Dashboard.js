import { useAuth } from "../context/AuthContext";
import MainLayout from "../layout/MainLayout";

export default function Dashboard() {
    const { user, logout } = useAuth();

    const renderContentByRole = () => {
        if (user.role === "owner") {
            return (
                <div>
                    <h2 className="text-xl font-bold mb-2">Панель собственника</h2>
                    <ul className="list-disc ml-5">
                        <li>Доступ ко всем настройкам</li>
                        <li>Портрет идеального кандидата</li>
                        <li>Полный доступ к вакансиям, тестам, сотрудникам</li>
                    </ul>
                </div>
            );
        }

        if (user.role === "manager") {
            return (
                <div>
                    <h2 className="text-xl font-bold mb-2">Панель руководителя</h2>
                    <ul className="list-disc ml-5">
                        <li>Профили специалистов</li>
                        <li>Отдел и KPI</li>
                    </ul>
                </div>
            );
        }

        if (user.role === "hr") {
            return (
                <div>
                    <h2 className="text-xl font-bold mb-2">Панель HR</h2>
                    <ul className="list-disc ml-5">
                        <li>Кандидаты и вакансии</li>
                        <li>База сотрудников</li>
                        <li>Результаты тестов</li>
                    </ul>
                </div>
            );
        }

        return <p>Неизвестная роль</p>;
    };

    return (
        <MainLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Добро пожаловать, {user.name} ({user.role})
                </h1>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Выйти
                </button>
            </div>

            <div className="bg-yellow-200 p-6 rounded shadow">
                {renderContentByRole()}
            </div>

            <p className="text-gray-700">Выберете раздел меню слева </p>
        </MainLayout>
    );
}
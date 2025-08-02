import {NavLink} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export default function Sidebar() {
    const {user} = useAuth()

    const menuItems = []

    if(user.role === "owner") {
        menuItems.push(
            {to: "/portrait", label: "Портрет кадидатов"},
            {to: "/departments", label: "Профили отделов"},
            {to: "/employees", label: "Сотрудники"},
            {to: "/tests", label: "Тесты"},
            {to: "/vacancies", label: "Вакансии"},
            {to: "/analytics", label: "Аналитика"}
        )
    }

    if(user.role === "hr") {
        menuItems.push(
            {to: "/candidates", label: "Кандидаты"},
            {to: "/vacancies", label: "Вакансии"},
            {to: "/tests", label: "Тесты"},
            {to: "/employees", label: "Сотрудники"}
        )
    }

    if(user.role === "manager") {
        menuItems.push(
            {to: "/departments", label: "Профили отделов"}
        )
    }

    return (
        <div className="w-64 h-screen bg-yellow-600 text-white p-4">
            <img src="./icons/alt_logo.png" alt="site-logo" className="w-[100px] h-[70px]"/>
            <nav className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                    <NavLink to={item.to} key={item.to} className={({isActive}) => `block px-4 py-2 rounded hover:bg-grey-700 ${isActive ? "bg-grey-700" : " "} hover:text-yellow-200`}>
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    )
}
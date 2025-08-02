import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState("");
    const [role, setRole] = useState("hr");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { data, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("name", name)
            .eq("role", role)
            .single();

        if (fetchError || !data) {
            setError("Пользователь не найден или неверная роль");
            setLoading(false);
            return;
        }

        if (data.password !== password) {
            setError("Неверный пароль");
            setLoading(false);
            return;
        }

        login(name, role);
        navigate("/dashboard");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { data: existing } = await supabase
            .from("users")
            .select("*")
            .eq("name", name)
            .eq("role", role)
            .single();

        if (existing) {
            setError("Такой пользователь уже существует");
            return;
        }

        const { error: insertError } = await supabase.from("users").insert([
            { name, role, password },
        ]);

        if (insertError) {
            setError("Ошибка при регистрации");
        } else {
            setSuccess("Пользователь зарегистрирован, теперь войдите");
            setIsRegistering(false);
            setName("");
            setPassword("");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-yellow-100">
            <form
                onSubmit={isRegistering ? handleRegister : handleLogin}
                className="bg-yellow-300 p-8 rounded shadow w-96"
            >
                <h2 className="text-2xl mb-4">
                    {isRegistering ? "Регистрация" : "Вход в систему"}
                </h2>

                <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-4 border rounded p-2"
                    required
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 border rounded p-2"
                    required
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                >
                    <option value="owner">Собственник</option>
                    <option value="manager">Руководитель</option>
                    <option value="hr">HR</option>
                </select>

                {error && <div className="text-red-500 mb-2">{error}</div>}
                {success && <div className="text-green-600 mb-2">{success}</div>}

                <div className="flex space-x-2">
                    <button
                        type="submit"
                        className="flex-1 bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500"
                        disabled={loading}
                    >
                        {isRegistering ? "Зарегистрировать" : loading ? "Проверка..." : "Войти"}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setError("");
                            setSuccess("");
                        }}
                        className="flex-1 bg-gray-300 text-black p-2 rounded hover:gray-500"
                    >
                        {isRegistering ? "Назад" : "Регистрация"}
                    </button>
                </div>
            </form>
        </div>
    );
}
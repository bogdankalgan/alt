import {createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setuser] =  useState(null)
    const navigate = useNavigate()

    const login = (name, role) => setuser({name, role})
    const logout = () => {
        setuser(null)
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

import {Routes, Route, Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard"
import PortraitPage from "../pages/PortraitPage";
import CandidatesPage from "../pages/CandidatesPage";
import EmployeePage from "../pages/EmployeePage";
import VacanciesPage from "../pages/VacanciesPage";
import EventsPlannerPage from "../pages/EventsPlannerPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import TestsPage from "../pages/TestsPage";
import DepartmentProfilesPage from "../pages/DepartamentProfilesPage";

const ProtectedRoute = ({children, roles}) => {
    const {user} = useAuth()
    if(!user) return <Navigate to={"/"}/>
    if(roles && !roles.includes(user.role)) return <Navigate to={"/unauthorized"}/>
    return children
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/dashboard" element={
                <ProtectedRoute roles={["owner", "manager", "hr"]}>
                    <Dashboard/>
                </ProtectedRoute>
            }/>

            <Route path="/portrait" element={
                <ProtectedRoute roles={["owner"]}>
                    <PortraitPage/>
                </ProtectedRoute>
            }/>

            <Route path="/candidates" element={
                <ProtectedRoute roles={["hr"]}>
                    <CandidatesPage/>
                </ProtectedRoute>
            }/>

            <Route
                path="/employees"
                element={
                    <ProtectedRoute roles={["hr", "owner"]}>
                        <EmployeePage />
                    </ProtectedRoute>
                }
            />

            <Route path={"/vacancies"} element={
                <ProtectedRoute roles={["hr", "owner"]}>
                <VacanciesPage/>
            </ProtectedRoute>
            }/>

            <Route path="/events" element={
                <ProtectedRoute roles={["hr"]}>
                    <EventsPlannerPage/>
                </ProtectedRoute>
            }/>

            <Route path={"/analytics"} element={
                <ProtectedRoute role={["owner"]}>
                    <AnalyticsPage/>
                </ProtectedRoute>
            }/>

            <Route path="/tests" element={
                <ProtectedRoute roles={["hr", "owner"]}>
                    <TestsPage/>
                </ProtectedRoute>
            }/>

            <Route path="/departments" element={
                <ProtectedRoute roles={["owner", "manager"]}>
                    <DepartmentProfilesPage/>
                </ProtectedRoute>
            }/>

        </Routes>
    )
}

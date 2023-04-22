import { FC } from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import AuthPage from "../pages/AuthPage/AuthPage"
import MainPage from "../pages/Main/MainPage"
import Recovery from "../pages/Recovery/Recovery"
import RegisterPage from "../pages/RegisterPage/RegisterPage"
import Profile from "../pages/Profile/Profile";
import MyCourses from "../pages/MyCourses/MyCourses";
import RouterGuard from "./RouterGuard"

const Navigator: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RouterGuard><MainPage /></RouterGuard>} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/reduction" element={<Recovery />} />
                <Route path="/profile" element={<RouterGuard><Profile /></RouterGuard>} />
                <Route path="/mycourses" element={<RouterGuard><MyCourses /></RouterGuard>} />
            </Routes>
        </BrowserRouter>
    )
}
export default Navigator;
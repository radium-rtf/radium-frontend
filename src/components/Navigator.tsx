import {FC, useEffect} from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import AuthPage from "../pages/AuthPage/AuthPage"
import Recovery from "../pages/Recovery/Recovery"
import RegisterPage from "../pages/RegisterPage/RegisterPage"
import Profile from "../pages/Profile/Profile";
import MyCourses from "../pages/MyCourses/MyCourses";
import RouterGuard from "./RouterGuard"
import TestUIKit from "../pages/TestUIKit/TestUIKit";
import CoursePage from "../pages/CoursePage/CoursePage";
import CourseLanding from "../pages/CourseLanding/CourseLanding";
import StatementTeatcher from "../pages/Statement/StatementTeatcher";

const Navigator: FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RouterGuard><MyCourses /></RouterGuard>} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/reduction" element={<Recovery />} />
                <Route path="/my-courses" element={<RouterGuard><MyCourses /></RouterGuard>} />
                <Route path="/profile" element={<RouterGuard><Profile /></RouterGuard>} />
                <Route path='/testuikit' element={<TestUIKit />} />
                <Route path='/course/:id' element={<RouterGuard><CourseLanding /></RouterGuard>} />
                <Route path='/module/:id' element={<RouterGuard><CoursePage /></RouterGuard>} />
                <Route path='/module' element={<RouterGuard><CoursePage /></RouterGuard>} />
                <Route path='/statement' element={<RouterGuard><StatementTeatcher /></RouterGuard>} />
                <Route path='/statement/:id' element={<RouterGuard><StatementTeatcher /></RouterGuard>} />
                <Route path='/tasks-check/:id' element={<RouterGuard><StatementTeatcher /></RouterGuard>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Navigator;
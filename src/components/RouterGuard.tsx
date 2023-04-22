import { FC } from "react";
import { useAppSelector } from "../hooks/redux"
import { Navigate, useLocation } from "react-router-dom";

const RouterGuard: FC<any> = ({ children }) => {

    const isAuth = useAppSelector(state => state.auth.isAuth);
    const location = useLocation();

    if (localStorage.getItem('token') === null && !isAuth) {
        return <Navigate to={'/auth'} state={{ from: location }}></Navigate>
    }

    return (
        children
    )
}
export default RouterGuard;
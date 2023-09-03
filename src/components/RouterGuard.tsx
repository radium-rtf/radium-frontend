import { FC } from "react";
import { useAppSelector } from "@/shared/api/store"
import { Navigate, useLocation, } from "react-router-dom";

const RouterGuard: FC<any> = ({ children }) => {

    const accessToken = useAppSelector(state => state.auth.accessToken);
    const location = useLocation();

    return (
        <div>
            {!accessToken
                ? <Navigate to={'/auth'} state={{ from: location }} />
                : (children)}
        </div>
    )
}
export default RouterGuard;
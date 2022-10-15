import { Navigate, Outlet } from "react-router-dom";
import authService from "../service/authService";

const PrivateRoute = () => {
    const { setAuthToken } = authService();
    const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token)
    }
    return (
        token ? <Outlet /> : <Navigate to="/" />
    );
}

export default PrivateRoute;

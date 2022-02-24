import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { routePath } from "../router/router";
import { RouteNames } from "../router/routes";

export default function LoginScreen() {
    const { user } = useAuth()

    const loginUrl = `${import.meta.env.VITE_API_URL}/auth/login`

    if(user != null) return <Navigate to={routePath(RouteNames.DASHBOARD)} />

    return (
        <a href={loginUrl}>Login</a>
    )
}

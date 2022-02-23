export default function LoginScreen() {

    const loginUrl = `${import.meta.env.VITE_API_URL}/auth/login`

    return (
        <a href={loginUrl}>Login</a>
    )
}
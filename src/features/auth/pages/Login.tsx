import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    const handleLogin = async (email: string, password: string) => {
        console.log("Login attempt:", email, password);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert(`Welcome, ${email}!`);
    };

    return <LoginForm onLogin={handleLogin} />;
}
import LoginForm from "../components/LoginForm";
import AuthContainer from "../components/AuthLayout";

export default function LoginPage() {
    const handleLogin = async (email: string, password: string) => {
        console.log("Login attempt:", email, password);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert(`Welcome, ${email}!`);
    };

    return (
        <AuthContainer
            leftCol="col-md-8"
            rightCol="col-md-4"
            rightClassName="d-flex justify-content-center align-items-center"
            rightStyle={{ minHeight: "100vh", paddingTop: 0 }}
            navIcon={<i className="bi bi-house fs-4 text-primary"></i>}
            navLink="/"
        >
            <LoginForm onLogin={handleLogin} />
        </AuthContainer>
    );
}
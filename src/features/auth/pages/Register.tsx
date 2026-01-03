import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
    const handleRegister = async (email: string, password: string) => {
        console.log("Registration:", { email, password });
        alert(`Welcome!`);
    };

    return <RegisterForm onRegister={handleRegister} loading={false} error="" />;
}
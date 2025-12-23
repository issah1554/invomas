import RegisterForm from "../components/RegisterForm";
import AuthContainer from "../components/AuthLayout";

export default function RegisterPage() {
    const handleRegister = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => {
        console.log("Registration:", { firstName, lastName, email, password, confirmPassword });
        alert(`Welcome, ${firstName}!`);
    };

    return (
        <AuthContainer
            leftCol="col-md-8"
            rightCol="col-md-4"
            rightClassName="d-flex justify-content-center align-items-center"
            rightStyle={{ minHeight: "100vh", paddingTop: 0 }}
            imageSrc="/payment-cover.png"
            logoSrc="/wifi-icon.png"
            appName="PayNet"
            navIcon={<i className="bi bi-house fs-4 text-primary"></i>}
            navLink="/"
        >
            <RegisterForm onRegister={handleRegister} loading={false} error="" />
        </AuthContainer>
    );
}
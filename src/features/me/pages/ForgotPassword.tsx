import { useState } from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import AuthContainer from "../components/AuthLayout";

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmitEmail = async () => {
        setLoading(true);
        setError("");
        setMessage("");
        try {
            await new Promise((res) => setTimeout(res, 1500));
            setMessage("Reset link sent to your email.");
        } catch {
            setError("Failed to send reset link. Please try again.");
        } finally {
            setLoading(false);
        }
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
            <ForgotPasswordForm
                onSubmitEmail={handleSubmitEmail}
                loading={loading}
                message={message}
                error={error}
            />
        </AuthContainer>
    );
}
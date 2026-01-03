import { useState } from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [, setMessage] = useState("");
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
        <ForgotPasswordForm
            onSubmitEmail={handleSubmitEmail}
            loading={loading}
            error={error}
        />
    );
}
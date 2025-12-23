import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Buttons";
import { TextInput } from "../../../components/TextInput";

interface ForgotPasswordFormProps {
    onSubmitEmail: (email: string) => Promise<void>;
    loading?: boolean;
    error?: string;
}

export default function ForgotPasswordForm({
    onSubmitEmail,
    loading = false,
    error,
}: ForgotPasswordFormProps) {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await onSubmitEmail(email);
    };

    return (
        <div className="card animation-zoom-in bg-transparent border-0 p-0 p-md-4">
            <div className="card-body p-0">
                <div className="mb-4">
                    <h3 className="text-primary fw-semibold">Forgot Password</h3>
                    <p className="text-muted small mb-0">
                        Enter your email and we’ll send you a password reset link.
                    </p>
                </div>

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="d-grid gap-3">
                    <TextInput
                        color="primary"
                        size="md"
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Button color="primary" size="md" className="mt-3">
                        {loading ? "Sending link..." : "Send Reset Link"}
                    </Button>
                </form>

                <div className="mt-4 text-center">
                    <Link to="/auth/login" className="text-primary fw-semibold">
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
}

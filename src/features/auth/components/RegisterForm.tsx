import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Buttons";
import { TextInput } from "../../../components/TextInput";

interface RegisterFormProps {
    onRegister: (email: string, password: string) => Promise<void>;
    loading?: boolean;
    error?: string;
}

export default function RegisterForm({
    onRegister,
    loading = false,
    error,
}: RegisterFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) return;
        await onRegister(email, password);
    };

    return (
        <div className="card animation-zoom-in bg-transparent border-0 p-0 p-md-4">
            <div className="card-body p-0">
                <div className="mb-4">
                    <h3 className="text-primary fw-semibold">Create Account</h3>
                    <p className="text-muted small mb-0">
                        Register to access your dashboard and start managing your account.
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

                    <TextInput
                        color="primary"
                        size="md"
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <TextInput
                        size="md"
                        color="primary"
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Repeat your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <Button color="primary" size="md" className="mt-3">
                        {loading ? "Creating account..." : "Register"}
                    </Button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-muted">Already have an account? </span>
                    <Link to="/auth/login" className="text-primary fw-semibold">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Buttons";
import { TextInput } from "../../../components/TextInput";

interface LoginFormProps {
    onLogin: (email: string, password: string) => Promise<void>;
    loading?: boolean;
    error?: string;
}

export default function LoginForm({ onLogin, loading = false, error }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await onLogin(email, password);
    };

    return (
        <div className="card  animation-zoom-in bg-transparent border-0  p-0 p-md-4">
            <div className="card-body p-0">

                <div className="mb-4">
                    <h3 className="text-primary fw-semibold">
                        Welcome Back
                    </h3>
                    <p className="text-muted small mb-0">
                        Sign in to continue to your account and manage your dashboard with ease.
                    </p>
                </div>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                    <TextInput
                        type="email"
                        color="primary"
                        name="email"
                        size="md"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextInput
                        type="password"
                        color="primary"
                        size="md"
                        name="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                            />
                            <label className="form-check-label small" htmlFor="rememberMe">
                                Remember me
                            </label>
                        </div>
                        <Link
                            to="/auth/forgot-password"
                            className="text-decoration-none small text-primary"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button color="primary" size="lg" rounded="full">
                        {loading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    aria-hidden="true"
                                ></span>
                                <span role="status">Signing you in...</span>
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-muted">Don’t have an account? </span>
                    <Link to="/auth/register" className="text-decoration-none text-primary fw-semibold">
                        Create one
                    </Link>
                </div>


            </div>
        </div>
    );
}
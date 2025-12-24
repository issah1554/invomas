import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/Buttons";
import { TextInput } from "../../../components/ui/TextInput";

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
                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="d-grid gap-3">
                    <TextInput
                        color="primary"
                        labelBgColor="bg-neutral-700"   
                        size="md"
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        rounded="none"
                        required
                    />

                    <TextInput
                        color="primary"
                        labelBgColor="bg-neutral-700"
                        size="md"
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        rounded="none"
                        required
                    />

                    <TextInput
                        size="md"
                        color="primary"
                        labelBgColor="bg-neutral-700"
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Repeat your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        rounded="none"
                        required
                    />

                </form>


                <div className="flex justify-between items-end mb-2">
                    <Button color="primary" size="md" className="mt-3">
                        {loading ? "Creating account..." : "Register"}
                    </Button>
                    <div className="text-center">
                        <span className="text-neutral">Already have an account? </span>
                        <Link to="/auth/login" className="text-primary fw-semibold hover:text-accent hover:underline">
                            Sign in
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}

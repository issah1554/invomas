import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../../../components/ui/Buttons";
import { TextInput } from "../../../components/ui/TextInput";
import { Link } from "react-router-dom";

interface ResetPasswordFormProps {
    onReset: (password: string) => Promise<void>;
    loading?: boolean;
    error?: string;
}

export default function ResetPasswordForm({
    onReset,
    loading = false,
    error,
}: ResetPasswordFormProps) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) return;
        await onReset(password);
    };

    return (
        <div className="card animation-zoom-in bg-transparent border-0 p-0 p-md-4 rounded-none">
            <div className="card-body p-0">
                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="d-grid gap-3">
                    <TextInput
                        color="primary"
                        size="md"
                        label="New Password"
                        labelBgColor="bg-main-200"
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        rounded="none"
                    />

                    <TextInput
                        color="primary"
                        size="md"
                        label="Confirm Password"
                        labelBgColor="bg-main-200"
                        type="password"
                        name="confirmPassword"
                        placeholder="Repeat new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        rounded="none"
                    />

                    <div className="flex justify-between items-end mb-2">
                        <Button color="primary" size="md" className="mt-3" >
                            {loading ? "Resetting password..." : "Reset Password"}
                        </Button>
                        <Link to="/auth/login" className="text-primary fw-semibold hover:underline hover:text-accent">
                            Back to login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

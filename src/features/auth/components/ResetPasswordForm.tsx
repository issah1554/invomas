import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../../../components/Buttons";
import { TextInput } from "../../../components/TextInput";

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
        <div className="card animation-zoom-in bg-transparent border-0 p-0 p-md-4">
            <div className="card-body p-0">
                <div className="mb-4">
                    <h3 className="text-primary fw-semibold">Reset Password</h3>
                    <p className="text-muted small mb-0">
                        Choose a new password for your account.
                    </p>
                </div>

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="d-grid gap-3">
                    <TextInput
                        color="primary"
                        size="md"
                        label="New Password"
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <TextInput
                        color="primary"
                        size="md"
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Repeat new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <Button color="primary" size="md" className="mt-3" >
                        {loading ? "Resetting password..." : "Reset Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

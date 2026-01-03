import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPasswordPage() {
    const handleReset = async () => {
        // TODO: Implement password reset logic
        console.log("Password reset submitted");
    };

    return <ResetPasswordForm loading={false} error="" onReset={handleReset} />;
}
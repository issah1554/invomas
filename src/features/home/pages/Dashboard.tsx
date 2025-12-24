import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPasswordPage() {

    return (

            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md">
                    <ResetPasswordForm loading={false} error="" onReset={function (): Promise<void> {
                        throw new Error("Function not implemented.");
                    } } />
                </div>
            </div>
   );
}
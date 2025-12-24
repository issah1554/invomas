import ResetPasswordForm from "../components/ResetPasswordForm";
import AuthContainer from "../components/AuthLayout";

export default function ResetPasswordPage() {

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
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md">
                    <ResetPasswordForm loading={false} error="" onReset={function (): Promise<void> {
                        throw new Error("Function not implemented.");
                    } } />
                </div>
            </div>

        </AuthContainer>
    );
}
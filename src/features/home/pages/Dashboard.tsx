import DashboardLayout from "../../../components/layout/Layout";

export default function HomePage() {

    return (
        <DashboardLayout>
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md">
                    <h1>Dashboard</h1>
                    <p>Welcome to the dashboard!</p>                    
                </div>
            </div>
        </DashboardLayout>
    );
}

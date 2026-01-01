import { AppLayout } from "../../components/layout/AppLayout";

export function Accounts() {
    return (
        <AppLayout>
            <div className="flex-1 p-6 text-main-700">
                <h1 className="text-3xl font-bold mb-4">Accounts</h1>
                <p>Welcome to your accounts page! Here you can manage your financial accounts.</p>
            </div>
        </AppLayout>
    );
}

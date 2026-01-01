import { AppLayout } from "../../../components/layout/AppLayout";

export function Users() {
    return (
        <AppLayout>
            <div className="flex-1 p-6 text-main-700">
                <h1 className="text-3xl font-bold mb-4">Users</h1>
                <p>Welcome to your users page! Here you can manage your users.</p>
            </div>
        </AppLayout>
    );
}

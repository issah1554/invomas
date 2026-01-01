import { AppLayout } from "../../../components/layout/AppLayout";
import CollapsibleTable from "../../../components/ui/Table";
import usersData from "../services/users.json"; // adjust the path

export function Users() {
    // JSON file has { "users": [...] }, so extract the array
    const users = usersData.users;

    return (
        <AppLayout>
            <div className="flex-1 p-6 text-main-700">
                <h1 className="text-3xl font-bold mb-4">Users</h1>
                <CollapsibleTable data={users} />
            </div>
        </AppLayout>
    );
}

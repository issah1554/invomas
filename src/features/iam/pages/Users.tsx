import { AppLayout } from "../../../components/layout/AppLayout";
import CollapsibleTable from "../../../components/ui/Table";
import { Button } from "../../../components/ui/Buttons";
import usersData from "../services/users.json";

export function Users() {
    const users = usersData.users;

    return (
        <AppLayout>
            <div className="flex-1 text-main-700">
                <h3 className="text font-bold mb-4">Users Management</h3>

                {/* Toolbar */}
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {/* Left: Filters */}
                    <div className="flex flex-wrap items-center gap-2">
                        <select
                            className="h-9 rounded-md border border-main-200 bg-main-200 px-2 text-sm outline-none focus:ring-2 focus:ring-main-300"
                        >
                            <option value="" className="bg-main-200">All roles</option>
                            <option value="admin" className="bg-main-200">Admin</option>
                            <option value="user" className="bg-main-200">User</option>
                        </select>

                        <select
                            className="h-9 rounded-md border border-main-200 bg-main-200 px-2 text-sm outline-none focus:ring-2 focus:ring-main-300"
                        >
                            <option value="" className="bg-main-200">Status</option>
                            <option value="active" className="bg-main-200">Active</option>
                            <option value="inactive" className="bg-main-200">Inactive</option>
                        </select>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 justify-end">
                        <Button
                            color="info"
                            size="sm"
                            className="h-9 rounded-md border border-main-200 px-3 text-sm font-medium hover:bg-info-800"
                            onClick={() => {
                                // export logic (csv/xlsx)
                            }}
                        >
                            Export
                        </Button>

                        <Button
                            color="success"
                            size="sm"
                            className="h-9 rounded-md bg-main-600 px-4 text-sm font-medium text--main-50 hover:bg-main-700"
                            onClick={() => {
                                // open "add user" modal
                            }}
                        >
                            + Add User
                        </Button>
                    </div>
                </div>

                <CollapsibleTable data={users} />
            </div>
        </AppLayout>
    );
}

import CollapsibleTable, { type Column } from "../../../components/ui/Table2";
import { Button } from "../../../components/ui/Buttons";
import Avatar from "../../../components/ui/Avatar";

/* =======================
   Row type
======================= */

type UserRow = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: "active" | "disabled";
    avatar: React.ReactNode;
};

/* =======================
   Columns
======================= */

const columns: Column<UserRow>[] = [
    {
        key: "name",
        header: "Name",
        sortable: true,
    },
    {
        key: "email",
        header: "Email",
        sortable: true,
    },
    {
        key: "role",
        header: "Role",
        sortable: true,
    },
    {
        key: "status",
        header: "Status",
        sortable: true,
        render: row => (
            <span
                className={`px-2 py-0.5 rounded text-xs font-semibold ${row.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
            >
                {row.status}
            </span>
        ),
    },
    {
        key: "actions", // virtual column
        header: "Actions",
        render: row => (
            <div className="flex gap-2">
                <Button size="xs" onClick={() => console.log("Edit", row.id)} color={"primary"}>
                    Edit
                </Button>
                <Button size="xs"  color={"error"} onClick={() => console.log("Delete", row.id)}>
                    Delete
                </Button>
            </div>
        ),
    },
];

/* =======================
   Data
======================= */

const users: UserRow[] = [
    {
        id: 1,
        name: "Jane Doe",
        email: "jane@example.com",
        role: "Admin",
        status: "active",
        avatar: <Avatar alt="Jane Doe" size={28} />,
    },
    {
        id: 2,
        name: "John Smith",
        email: "john@example.com",
        role: "Editor",
        status: "disabled",
        avatar: <Avatar alt="John Smith" size={28} />,
    },
];

/* =======================
   Component
======================= */

export default function UsersPage() {
    return (
        <CollapsibleTable
            data={users}
            columns={columns}
            rowsPerPage={5}
        />
    );
}

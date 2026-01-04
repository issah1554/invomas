import CollapsibleTable, { type Column } from "../../../components/ui/Table2";
import { Modal } from "../../../components/ui/Modal";
import AvatarGroup from "../../../components/ui/AvatarGroup";
import { Button } from "../../../components/ui/Buttons";
import { TextInput } from "../../../components/ui/TextInput";
import rolesData from "../services/roles.json";
import { useState } from "react";
import { Toast } from "../../../components/ui/Toast";

/* =======================
   Types
======================= */

type UserInRole = {
    id: number;
    name: string;
    src?: string;
    status?: "online" | "offline" | "disabled" | "pending";
};

type RoleRow = {
    id: number;
    name: string;
    description: string;
    users: UserInRole[];
};

/* =======================
   Mock users data by role
======================= */

const usersPerRole: Record<string, UserInRole[]> = {
    Admin: [
        { id: 1, name: "Jane Doe", src: "https://randomuser.me/api/portraits/women/44.jpg", status: "online" },
        { id: 6, name: "Diana Evans", src: "https://randomuser.me/api/portraits/women/68.jpg", status: "online" },
    ],
    Manager: [
        { id: 7, name: "Mike Wilson", src: "https://randomuser.me/api/portraits/men/32.jpg", status: "offline" },
        { id: 8, name: "Sarah Connor", status: "online" },
        { id: 9, name: "Tom Hardy", src: "https://randomuser.me/api/portraits/men/65.jpg", status: "pending" },
    ],
    Editor: [
        { id: 2, name: "John Smith", status: "offline" },
        { id: 4, name: "Bob Brown", src: "https://randomuser.me/api/portraits/men/78.jpg", status: "online" },
    ],
    Viewer: [
        { id: 3, name: "Alice Johnson", src: "https://randomuser.me/api/portraits/women/22.jpg", status: "online" },
        { id: 5, name: "Charlie Davis", src: "https://randomuser.me/api/portraits/men/55.jpg", status: "offline" },
    ],
    Guest: [
        { id: 10, name: "Guest User", status: "pending" },
    ],
};

/* =======================
   Transform roles data
======================= */

const roles: RoleRow[] = rolesData.roles.map(role => ({
    ...role,
    users: usersPerRole[role.name] || [],
}));

/* =======================
   Columns
======================= */

const columns: Column<RoleRow>[] = [
    {
        key: "name",
        header: "Role Name",
        sortable: true,
        priority: 10,
    },
    {
        key: "description",
        header: "Description",
        sortable: true,
        priority: 7,
    },
    {
        key: "users",
        header: "Users",
        priority: 9,
        render: row => (
            <AvatarGroup
                size={28}
                max={4}
                overlap={8}
                avatars={row.users.map(user => ({
                    id: user.id,
                    alt: user.name,
                    src: user.src,
                    status: user.status,
                }))}
            />
        ),
    },
    {
        key: "actions",
        header: "Actions",
        priority: 8,
        render: () => (
            <div className="flex gap-2">
                <Button size="xs" color="primary" onClick={() => Toast.fire({ icon: "success", title: "Role updated!" })}>
                    Edit
                </Button>
                <Button size="xs" color="error" onClick={() => Toast.fire({ icon: "success", title: "Role deleted!" })}>
                    Delete
                </Button>
            </div>
        ),
    },
];

/* =======================
   Component
======================= */

export function Roles() {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const handleInputChange =
        (field: keyof typeof formData) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setFormData(prev => ({ ...prev, [field]: e.target.value }));
            };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Role submitted:", formData);
        setOpen(false);
        setFormData({ name: "", description: "" });
    };

    const handleClose = () => setOpen(false);

    return (
        <div className="flex-1 text-main-700">
            <h3 className="font-bold mb-4">Roles Management</h3>

            {/* Toolbar */}
            <div className="mb-4 flex items-center justify-end gap-2">
                <Button
                    color="primary"
                    size="sm"
                    rounded="md"
                    onClick={() => setOpen(true)}
                >
                    <i className="bi bi-plus-lg mr-2" />
                    Add Role
                </Button>
            </div>

            {/* Add Role Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                size="md"
                position="center"
                blur
                closeOnBackdrop
                closeOnEsc
            >
                <div
                    className={`bg-main-100 rounded-lg shadow-xl overflow-hidden ${open ? "animation-zoom-in" : "animation-zoom-out"
                        }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 text-main-700">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <i className="bi bi-shield-lock" />
                            Add New Role
                        </h3>
                        <button onClick={handleClose}>
                            <i className="bi bi-x-lg" />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <TextInput
                            color="primary"
                            size="md"
                            rounded="none"
                            placeholder="Role name"
                            value={formData.name}
                            onChange={handleInputChange("name")}
                            required
                        />

                        <TextInput
                            color="primary"
                            size="md"
                            rounded="none"
                            placeholder="Role description"
                            value={formData.description}
                            onChange={handleInputChange("description")}
                        />

                        {/* Footer */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-main-200">
                            <Button
                                color="neutral"
                                size="sm"
                                variant="outline"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button color="primary" size="sm">
                                <i className="bi bi-check-lg mr-2" />
                                Create Role
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Roles Table */}
            <CollapsibleTable
                data={roles}
                columns={columns}
                rowsPerPage={5}
            />
        </div>
    );
}

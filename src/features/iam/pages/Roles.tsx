import CollapsibleTable from "../../../components/ui/Table";
import { Modal } from "../../../components/ui/Modal";
import AvatarGroup from "../../../components/ui/AvatarGroup";
import { Button } from "../../../components/ui/Buttons";
import { TextInput } from "../../../components/ui/TextInput";
import rolesData from "../services/roles.json";
import { useState } from "react";
import Pagination from "../../../components/ui/Pagination";

export function Roles() {
    const roles = rolesData.roles;
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
            <CollapsibleTable data={roles} />

            <AvatarGroup
                size={40}
                max={5}
                overlap={10}
                avatars={[
                    { id: 1, alt: "John Doe", src: "https://randomuser.me/api/portraits/men/32.jpg", status: "online" },
                    { id: 2, alt: "Jane Smith", src: "https://randomuser.me/api/portraits/women/44.jpg", status: "offline" },
                    { id: 3, alt: "Alex Ray", src: "https://randomuser.me/api/portraits/men/65.jpg", status: "pending" },
                    { id: 4, alt: "Kim Lee", src: "https://randomuser.me/api/portraits/women/12.jpg" },
                    { id: 5, alt: "Issah Xevier ", src: "https://randomuser.me/api/portraits/men/78.jpg" },
                    { id: 1, alt: "John Doe", src: "https://randomuser.me/api/portraits/men/32.jpg", status: "online" },
                    { id: 1, alt: "John Doe", src: "https://randomuser.me/api/portraits/men/32.jpg", status: "online" },
                    { id: 2, alt: "Jane Smith", src: "https://randomuser.me/api/portraits/women/44.jpg", status: "offline" },
                    { id: 3, alt: "Alex Ray", src: "https://randomuser.me/api/portraits/men/65.jpg", status: "pending" },
                    { id: 4, alt: "Kim Lee", src: "https://randomuser.me/api/portraits/women/12.jpg" },
                    { id: 5, alt: "Issah Xevier ", src: "https://randomuser.me/api/portraits/men/78.jpg" },
                    { id: 1, alt: "John Doe", src: "https://randomuser.me/api/portraits/men/32.jpg", status: "online" },
                    { id: 1, alt: "John Doe", src: "https://randomuser.me/api/portraits/men/32.jpg", status: "online" },
                    { id: 2, alt: "Jane Smith", src: "https://randomuser.me/api/portraits/women/44.jpg", status: "offline" },
                    { id: 3, alt: "Alex Ray", src: "https://randomuser.me/api/portraits/men/65.jpg", status: "pending" },
                    { id: 4, alt: "Kim Lee", src: "https://randomuser.me/api/portraits/women/12.jpg" },
                    { id: 5, alt: "Issah Xevier ", src: "https://randomuser.me/api/portraits/men/78.jpg" },
                    { id: 1, alt: "John Doe", src: "https://randomuser.me/api/portraits/men/32.jpg", status: "online" },
                ]}
            />
            
            <Pagination page={5} pageSize={10} totalItems={100} onChange={page => console.log(page)} showHelper size="sm" rounded="full" />

        </div>
    );
}

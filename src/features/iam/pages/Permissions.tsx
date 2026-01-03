import CollapsibleTable from "../../../components/ui/Table";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Buttons";
import { TextInput } from "../../../components/ui/TextInput";
import permissionsData from "../services/permissions.json";
import { useState } from "react";

export function Permissions() {
    const permissions = permissionsData.permissions;
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const handleInputChange =
        (field: keyof typeof formData) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData(prev => ({ ...prev, [field]: e.target.value }));
            };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Permission submitted:", formData);
        setOpen(false);
        setFormData({ name: "", description: "" });
    };

    const handleClose = () => setOpen(false);

    return (
        <div className="flex-1 text-main-700">
            <h3 className="font-bold mb-4">Permissions Management</h3>

            {/* Toolbar */}
            <div className="mb-4 flex items-center justify-end gap-2">
                <Button
                    color="primary"
                    size="sm"
                    rounded="md"
                    onClick={() => setOpen(true)}
                >
                    <i className="bi bi-plus-lg mr-2" />
                    Add Permission
                </Button>
            </div>

            {/* Add Permission Modal */}
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
                            <i className="bi bi-key" />
                            Add New Permission
                        </h3>
                        <button onClick={handleClose}>
                            <i className="bi bi-x-lg" />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <TextInput
                            label="Permission Name"
                            labelBgColor="bg-main-100"
                            color="primary"
                            size="md"
                            rounded="md"
                            placeholder="users:view"
                            value={formData.name}
                            onChange={handleInputChange("name")}
                            required
                        />

                        <TextInput
                            label="Description"
                            labelBgColor="bg-main-100"
                            color="primary"
                            size="md"
                            rounded="md"
                            placeholder="Ability to view users"
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
                                Create Permission
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Permissions Table */}
            <CollapsibleTable data={permissions} />
        </div>
    );
}

import CollapsibleTable from "../../../components/ui/Table";
import { Modal } from "../../../components/ui/Modal2";
import { Button } from "../../../components/ui/Buttons";
import { TextInput } from "../../../components/ui/TextInput";
import usersData from "../services/users.json";
import { useState } from "react";

export function Users() {
    const users = usersData.users;
    const [open, setOpen] = useState<boolean>(false);

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        status: "active",
    });

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
        setOpen(false);
        // Reset form
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            role: "",
            status: "active",
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
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
                        variant="outline"
                        rounded="md"
                    >
                        <i className="bi bi-download mr-2" />
                        Export
                    </Button>

                    <Button
                        color="primary"
                        size="sm"
                        rounded="md"
                        onClick={() => setOpen(true)}
                    >
                        <i className="bi bi-plus-lg mr-2" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* Add User Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                size="lg"
                position="center"
                blur={true}
                closeOnBackdrop={true}
                closeOnEsc={true}
            >
                <div className={`bg-main-100 rounded-lg shadow-xl overflow-hidden ${open ? "animation-zoom-in" : "animation-zoom-out"}`} >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-6 py-4  text-main-700">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <i className="bi bi-person-plus" />
                            Add New User
                        </h3>
                        <button
                            onClick={handleClose}
                            className="text-white/80 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                        >
                            <i className="bi bi-x-lg" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                            <TextInput
                                label="First Name"
                                labelBgColor="bg-main-100"
                                color="primary"
                                size="md"
                                rounded="md"
                                placeholder="Enter first name"
                                value={formData.firstName}
                                onChange={handleInputChange("firstName")}
                                required
                            />

                            <TextInput
                                label="Last Name"
                                labelBgColor="bg-main-100"
                                color="primary"
                                size="md"
                                rounded="md"
                                placeholder="Enter last name"
                                value={formData.lastName}
                                onChange={handleInputChange("lastName")}
                                required
                            />

                            <TextInput
                                label="Email Address"
                                labelBgColor="bg-main-100"
                                type="email"
                                color="primary"
                                size="md"
                                rounded="md"
                                placeholder="user@example.com"
                                value={formData.email}
                                onChange={handleInputChange("email")}
                                required
                            />

                            <TextInput
                                labelBgColor="bg-main-100"
                                label="Phone Number"
                                type="tel"
                                color="primary"
                                size="md"
                                rounded="md"
                                placeholder="+1 (555) 000-0000"
                                value={formData.phone}
                                onChange={handleInputChange("phone")}
                            />

                            <div className="flex flex-col gap-1 items-start text-left w-full my-3">
                                <label className="text-sm font-medium text-main-600 mb-1">
                                    Role <span className="text-error">*</span>
                                </label>
                                <select
                                    value={formData.role}
                                    onChange={handleInputChange("role")}
                                    required
                                    className="w-full h-11 px-4 rounded-md border border-main-300 bg-main-100 text-main-700
                                        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                                        transition-colors"
                                >
                                    <option value="">Select a role</option>
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="user">User</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1 items-start text-left w-full my-3">
                                <label className="text-sm font-medium text-main-600 mb-1">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={handleInputChange("status")}
                                    className="w-full h-11 px-4 rounded-md border border-main-300 bg-main-100 text-main-700
                                        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                                        transition-colors"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-main-200">
                            <Button
                                color="neutral"
                                size="sm"
                                variant="outline"
                                rounded="md"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                size="sm"
                                rounded="md"
                            >
                                <i className="bi bi-check-lg mr-2" />
                                Create User
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Users Table */}
            <CollapsibleTable data={users} />
        </div>
    );
}

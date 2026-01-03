import { useState } from "react";
import { Button } from "../../../components/ui/Buttons";
import { Modal } from "../../../components/ui/Modal";
import { TextInput } from "../../../components/ui/TextInput";

const sampleServices = [
    { id: 1, name: "Printing Services", description: "Document and photo printing", rate: 0.10, unit: "per page", status: "Active" },
    { id: 2, name: "Lamination", description: "Document lamination services", rate: 2.50, unit: "per item", status: "Active" },
    { id: 3, name: "Binding", description: "Document binding and spiral binding", rate: 5.00, unit: "per book", status: "Active" },
    { id: 4, name: "Custom Stamps", description: "Custom rubber stamp creation", rate: 15.00, unit: "per stamp", status: "Inactive" },
    { id: 5, name: "Engraving", description: "Pen and award engraving", rate: 8.00, unit: "per item", status: "Active" },
];

export function Services() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "", rate: "", unit: "" });

    const handleClose = () => setOpen(false);

    return (
        <div className="flex-1 text-main-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text font-bold">Services</h3>
                <Button color="primary" size="sm" rounded="md" onClick={() => setOpen(true)}>
                    <i className="bi bi-plus-lg mr-2" />
                    Add Service
                </Button>
            </div>

            {/* Services Table */}
            <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-main-200">
                        <tr>
                            <th className="text-left p-4 font-medium">Service Name</th>
                            <th className="text-left p-4 font-medium">Description</th>
                            <th className="text-left p-4 font-medium">Rate</th>
                            <th className="text-left p-4 font-medium">Status</th>
                            <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleServices.map(service => (
                            <tr key={service.id} className="border-t border-main-200 hover:bg-main-50">
                                <td className="p-4 font-medium">{service.name}</td>
                                <td className="p-4 text-main-600">{service.description}</td>
                                <td className="p-4">${service.rate.toFixed(2)} <span className="text-main-500 text-sm">{service.unit}</span></td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                                        ${service.status === "Active" ? "bg-success/20 text-success" : "bg-main-300 text-main-600"}`}>
                                        {service.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button className="p-1 hover:bg-main-200 rounded"><i className="bi bi-pencil" /></button>
                                    <button className="p-1 hover:bg-main-200 rounded ml-2"><i className="bi bi-trash" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Service Modal */}
            <Modal open={open} onClose={handleClose} size="md" position="center" blur closeOnBackdrop closeOnEsc>
                <div className={`bg-main-100 rounded-lg shadow-xl overflow-hidden ${open ? "animation-zoom-in" : ""}`}>
                    <div className="flex items-center justify-between px-6 py-4 text-main-700">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <i className="bi bi-gear" />
                            Add New Service
                        </h3>
                        <button onClick={handleClose}><i className="bi bi-x-lg" /></button>
                    </div>
                    <form className="p-6 space-y-4">
                        <TextInput label="Service Name" labelBgColor="bg-main-100" color="primary" size="md" rounded="md"
                            value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
                        <TextInput label="Description" labelBgColor="bg-main-100" color="primary" size="md" rounded="md"
                            value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} />
                        <div className="grid grid-cols-2 gap-4">
                            <TextInput label="Rate" labelBgColor="bg-main-100" color="primary" size="md" rounded="md" type="number"
                                value={formData.rate} onChange={e => setFormData(p => ({ ...p, rate: e.target.value }))} />
                            <TextInput label="Unit (e.g., per page)" labelBgColor="bg-main-100" color="primary" size="md" rounded="md"
                                value={formData.unit} onChange={e => setFormData(p => ({ ...p, unit: e.target.value }))} />
                        </div>
                        <div className="flex justify-end gap-3 pt-4 border-t border-main-200">
                            <Button color="neutral" size="sm" variant="outline" onClick={handleClose}>Cancel</Button>
                            <Button color="primary" size="sm"><i className="bi bi-check-lg mr-2" />Add Service</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}


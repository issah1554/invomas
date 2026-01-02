import { useState } from "react";
import { Button } from "../../../components/ui/Buttons";
import { Modal } from "../../../components/ui/Modal2";
import { TextInput } from "../../../components/ui/TextInput";

const samplePurchases = [
    { id: "PO-001", supplier: "Paper Supply Co.", date: "2026-01-02", items: 10, total: 850.00, status: "Received" },
    { id: "PO-002", supplier: "Office Depot", date: "2026-01-01", items: 5, total: 320.00, status: "In Transit" },
    { id: "PO-003", supplier: "Staples Inc.", date: "2025-12-30", items: 15, total: 1200.00, status: "Received" },
    { id: "PO-004", supplier: "Art Materials Ltd.", date: "2025-12-28", items: 8, total: 450.00, status: "Pending" },
    { id: "PO-005", supplier: "Writing Supplies Co.", date: "2025-12-25", items: 20, total: 680.00, status: "Received" },
];

export function Purchases() {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const totalPurchases = samplePurchases.reduce((sum, p) => sum + p.total, 0);

    return (
        <div className="flex-1 text-main-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text font-bold">Purchases</h3>
                <div className="flex gap-2">
                    <Button color="info" size="sm" variant="outline" rounded="md">
                        <i className="bi bi-download mr-2" />
                        Export
                    </Button>
                    <Button color="primary" size="sm" rounded="md" onClick={() => setOpen(true)}>
                        <i className="bi bi-plus-lg mr-2" />
                        New Purchase Order
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <i className="bi bi-bag-plus text-primary text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-main-500">Total Purchases</p>
                            <p className="text-xl font-bold">${totalPurchases.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                            <i className="bi bi-box-seam text-success text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-main-500">Received</p>
                            <p className="text-xl font-bold">{samplePurchases.filter(p => p.status === "Received").length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                            <i className="bi bi-truck text-info text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-main-500">In Transit</p>
                            <p className="text-xl font-bold">{samplePurchases.filter(p => p.status === "In Transit").length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Purchases Table */}
            <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-main-200">
                        <tr>
                            <th className="text-left p-4 font-medium">Order #</th>
                            <th className="text-left p-4 font-medium">Supplier</th>
                            <th className="text-left p-4 font-medium">Date</th>
                            <th className="text-left p-4 font-medium">Items</th>
                            <th className="text-left p-4 font-medium">Total</th>
                            <th className="text-left p-4 font-medium">Status</th>
                            <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {samplePurchases.map(purchase => (
                            <tr key={purchase.id} className="border-t border-main-200 hover:bg-main-50">
                                <td className="p-4 font-medium text-primary">{purchase.id}</td>
                                <td className="p-4">{purchase.supplier}</td>
                                <td className="p-4">{purchase.date}</td>
                                <td className="p-4">{purchase.items}</td>
                                <td className="p-4 font-medium">${purchase.total.toFixed(2)}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                                        ${purchase.status === "Received" ? "bg-success/20 text-success" : 
                                          purchase.status === "In Transit" ? "bg-info/20 text-info" : 
                                          "bg-warning/20 text-warning"}`}>
                                        {purchase.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button className="p-1 hover:bg-main-200 rounded"><i className="bi bi-eye" /></button>
                                    <button className="p-1 hover:bg-main-200 rounded ml-2"><i className="bi bi-pencil" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* New Purchase Modal */}
            <Modal open={open} onClose={handleClose} size="lg" position="center" blur closeOnBackdrop closeOnEsc>
                <div className={`bg-main-100 rounded-lg shadow-xl overflow-hidden ${open ? "animation-zoom-in" : ""}`}>
                    <div className="flex items-center justify-between px-6 py-4 text-main-700">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <i className="bi bi-bag-plus" />
                            Create Purchase Order
                        </h3>
                        <button onClick={handleClose}><i className="bi bi-x-lg" /></button>
                    </div>
                    <form className="p-6 space-y-4">
                        <TextInput label="Supplier Name" labelBgColor="bg-main-100" color="primary" size="md" rounded="md" required />
                        <TextInput label="Expected Delivery Date" labelBgColor="bg-main-100" color="primary" size="md" rounded="md" type="date" />
                        <p className="text-sm text-main-500">Add items to this purchase order below.</p>
                        <div className="flex justify-end gap-3 pt-4 border-t border-main-200">
                            <Button color="neutral" size="sm" variant="outline" onClick={handleClose}>Cancel</Button>
                            <Button color="primary" size="sm"><i className="bi bi-check-lg mr-2" />Create Order</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}


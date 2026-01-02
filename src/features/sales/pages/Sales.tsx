import { useState } from "react";
import { Button } from "../../../components/ui/Buttons";
import { Modal } from "../../../components/ui/Modal2";
import { TextInput } from "../../../components/ui/TextInput";

const sampleSales = [
    { id: "INV-001", customer: "John Doe", date: "2026-01-02", items: 5, total: 125.50, status: "Completed" },
    { id: "INV-002", customer: "Jane Smith", date: "2026-01-02", items: 3, total: 45.99, status: "Pending" },
    { id: "INV-003", customer: "ABC Corp", date: "2026-01-01", items: 12, total: 350.00, status: "Completed" },
    { id: "INV-004", customer: "Mike Johnson", date: "2026-01-01", items: 2, total: 28.50, status: "Cancelled" },
    { id: "INV-005", customer: "Sarah Wilson", date: "2025-12-31", items: 8, total: 189.75, status: "Completed" },
];

export function Sales() {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const totalSales = sampleSales.filter(s => s.status === "Completed").reduce((sum, s) => sum + s.total, 0);

    return (
        <div className="flex-1 text-main-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text font-bold">Sales</h3>
                <div className="flex gap-2">
                    <Button color="info" size="sm" variant="outline" rounded="md">
                        <i className="bi bi-download mr-2" />
                        Export
                    </Button>
                    <Button color="primary" size="sm" rounded="md" onClick={() => setOpen(true)}>
                        <i className="bi bi-plus-lg mr-2" />
                        New Sale
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                            <i className="bi bi-currency-dollar text-success text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-main-500">Total Sales</p>
                            <p className="text-xl font-bold">${totalSales.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <i className="bi bi-receipt text-primary text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-main-500">Total Invoices</p>
                            <p className="text-xl font-bold">{sampleSales.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                            <i className="bi bi-clock text-warning text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-main-500">Pending</p>
                            <p className="text-xl font-bold">{sampleSales.filter(s => s.status === "Pending").length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sales Table */}
            <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-main-200">
                        <tr>
                            <th className="text-left p-4 font-medium">Invoice #</th>
                            <th className="text-left p-4 font-medium">Customer</th>
                            <th className="text-left p-4 font-medium">Date</th>
                            <th className="text-left p-4 font-medium">Items</th>
                            <th className="text-left p-4 font-medium">Total</th>
                            <th className="text-left p-4 font-medium">Status</th>
                            <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleSales.map(sale => (
                            <tr key={sale.id} className="border-t border-main-200 hover:bg-main-50">
                                <td className="p-4 font-medium text-primary">{sale.id}</td>
                                <td className="p-4">{sale.customer}</td>
                                <td className="p-4">{sale.date}</td>
                                <td className="p-4">{sale.items}</td>
                                <td className="p-4 font-medium">${sale.total.toFixed(2)}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                                        ${sale.status === "Completed" ? "bg-success/20 text-success" : 
                                          sale.status === "Pending" ? "bg-warning/20 text-warning" : 
                                          "bg-error/20 text-error"}`}>
                                        {sale.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button className="p-1 hover:bg-main-200 rounded"><i className="bi bi-eye" /></button>
                                    <button className="p-1 hover:bg-main-200 rounded ml-2"><i className="bi bi-printer" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* New Sale Modal */}
            <Modal open={open} onClose={handleClose} size="lg" position="center" blur closeOnBackdrop closeOnEsc>
                <div className={`bg-main-100 rounded-lg shadow-xl overflow-hidden ${open ? "animation-zoom-in" : ""}`}>
                    <div className="flex items-center justify-between px-6 py-4 text-main-700">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <i className="bi bi-cart-plus" />
                            Create New Sale
                        </h3>
                        <button onClick={handleClose}><i className="bi bi-x-lg" /></button>
                    </div>
                    <form className="p-6 space-y-4">
                        <TextInput label="Customer Name" labelBgColor="bg-main-100" color="primary" size="md" rounded="md" required />
                        <p className="text-sm text-main-500">Add items to this sale using the product selector below.</p>
                        <div className="flex justify-end gap-3 pt-4 border-t border-main-200">
                            <Button color="neutral" size="sm" variant="outline" onClick={handleClose}>Cancel</Button>
                            <Button color="primary" size="sm"><i className="bi bi-check-lg mr-2" />Create Sale</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}


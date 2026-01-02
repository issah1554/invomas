import { useState } from "react";
import { Button } from "../../../components/ui/Buttons";
import { Modal } from "../../../components/ui/Modal2";
import { TextInput } from "../../../components/ui/TextInput";

const sampleExpenses = [
    { id: 1, description: "Office Rent", category: "Rent", amount: 2500.00, date: "2026-01-01", status: "Paid" },
    { id: 2, description: "Electricity Bill", category: "Utilities", amount: 350.00, date: "2026-01-02", status: "Pending" },
    { id: 3, description: "Internet Service", category: "Utilities", amount: 89.99, date: "2025-12-28", status: "Paid" },
    { id: 4, description: "Office Supplies Restock", category: "Supplies", amount: 450.00, date: "2025-12-25", status: "Paid" },
    { id: 5, description: "Equipment Maintenance", category: "Maintenance", amount: 200.00, date: "2025-12-20", status: "Paid" },
];

export function Expenses() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ description: "", category: "", amount: "", date: "" });

    const handleClose = () => setOpen(false);
    const totalExpenses = sampleExpenses.reduce((sum, e) => sum + e.amount, 0);

    return (
        <div className="flex-1 text-main-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text font-bold">Expenses</h3>
                <div className="flex gap-2">
                    <Button color="info" size="sm" variant="outline" rounded="md">
                        <i className="bi bi-download mr-2" />
                        Export
                    </Button>
                    <Button color="primary" size="sm" rounded="md" onClick={() => setOpen(true)}>
                        <i className="bi bi-plus-lg mr-2" />
                        Add Expense
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                            <i className="bi bi-cash-stack text-error text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-main-500">Total Expenses</p>
                            <p className="text-xl font-bold">${totalExpenses.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                            <i className="bi bi-check-circle text-success text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-main-500">Paid</p>
                            <p className="text-xl font-bold">{sampleExpenses.filter(e => e.status === "Paid").length}</p>
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
                            <p className="text-xl font-bold">{sampleExpenses.filter(e => e.status === "Pending").length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expenses Table */}
            <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-main-200">
                        <tr>
                            <th className="text-left p-4 font-medium">Description</th>
                            <th className="text-left p-4 font-medium">Category</th>
                            <th className="text-left p-4 font-medium">Amount</th>
                            <th className="text-left p-4 font-medium">Date</th>
                            <th className="text-left p-4 font-medium">Status</th>
                            <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleExpenses.map(expense => (
                            <tr key={expense.id} className="border-t border-main-200 hover:bg-main-50">
                                <td className="p-4 font-medium">{expense.description}</td>
                                <td className="p-4">{expense.category}</td>
                                <td className="p-4 text-error font-medium">-${expense.amount.toFixed(2)}</td>
                                <td className="p-4">{expense.date}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                                        ${expense.status === "Paid" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}>
                                        {expense.status}
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

            {/* Add Expense Modal */}
            <Modal open={open} onClose={handleClose} size="md" position="center" blur closeOnBackdrop closeOnEsc>
                <div className={`bg-main-100 rounded-lg shadow-xl overflow-hidden ${open ? "animation-zoom-in" : ""}`}>
                    <div className="flex items-center justify-between px-6 py-4 text-main-700">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <i className="bi bi-cash-stack" />
                            Add New Expense
                        </h3>
                        <button onClick={handleClose}><i className="bi bi-x-lg" /></button>
                    </div>
                    <form className="p-6 space-y-4">
                        <TextInput label="Description" labelBgColor="bg-main-100" color="primary" size="md" rounded="md"
                            value={formData.description} onChange={e => setFormData(p => ({...p, description: e.target.value}))} required />
                        <TextInput label="Category" labelBgColor="bg-main-100" color="primary" size="md" rounded="md"
                            value={formData.category} onChange={e => setFormData(p => ({...p, category: e.target.value}))} />
                        <div className="grid grid-cols-2 gap-4">
                            <TextInput label="Amount" labelBgColor="bg-main-100" color="primary" size="md" rounded="md" type="number"
                                value={formData.amount} onChange={e => setFormData(p => ({...p, amount: e.target.value}))} required />
                            <TextInput label="Date" labelBgColor="bg-main-100" color="primary" size="md" rounded="md" type="date"
                                value={formData.date} onChange={e => setFormData(p => ({...p, date: e.target.value}))} />
                        </div>
                        <div className="flex justify-end gap-3 pt-4 border-t border-main-200">
                            <Button color="neutral" size="sm" variant="outline" onClick={handleClose}>Cancel</Button>
                            <Button color="primary" size="sm"><i className="bi bi-check-lg mr-2" />Add Expense</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}


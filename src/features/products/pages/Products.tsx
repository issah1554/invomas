import { useState } from "react";
import { Button } from "../../../components/ui/Buttons";
import { Modal } from "../../../components/ui/Modal2";
import { TextInput } from "../../../components/ui/TextInput";

const sampleProducts = [
    { id: 1, name: "Notebook A5", category: "Stationery", price: 5.99, stock: 150, status: "In Stock" },
    { id: 2, name: "Ballpoint Pen (Blue)", category: "Writing", price: 1.50, stock: 500, status: "In Stock" },
    { id: 3, name: "Stapler", category: "Office Supplies", price: 8.99, stock: 75, status: "In Stock" },
    { id: 4, name: "Paper Clips (Box)", category: "Office Supplies", price: 2.99, stock: 0, status: "Out of Stock" },
    { id: 5, name: "Highlighter Set", category: "Writing", price: 6.49, stock: 45, status: "Low Stock" },
];

export function Products() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", category: "", price: "", stock: "" });

    const handleClose = () => setOpen(false);

    return (
        <div className="flex-1 text-main-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text font-bold">Products</h3>
                <div className="flex gap-2">
                    <Button color="info" size="sm" variant="outline" rounded="md">
                        <i className="bi bi-download mr-2" />
                        Export
                    </Button>
                    <Button color="primary" size="sm" rounded="md" onClick={() => setOpen(true)}>
                        <i className="bi bi-plus-lg mr-2" />
                        Add Product
                    </Button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-main-200">
                        <tr>
                            <th className="text-left p-4 font-medium">Product Name</th>
                            <th className="text-left p-4 font-medium">Category</th>
                            <th className="text-left p-4 font-medium">Price</th>
                            <th className="text-left p-4 font-medium">Stock</th>
                            <th className="text-left p-4 font-medium">Status</th>
                            <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleProducts.map(product => (
                            <tr key={product.id} className="border-t border-main-200 hover:bg-main-50">
                                <td className="p-4">{product.name}</td>
                                <td className="p-4">{product.category}</td>
                                <td className="p-4">${product.price.toFixed(2)}</td>
                                <td className="p-4">{product.stock}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                                        ${product.status === "In Stock" ? "bg-success/20 text-success" : 
                                          product.status === "Low Stock" ? "bg-warning/20 text-warning" : 
                                          "bg-error/20 text-error"}`}>
                                        {product.status}
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

            {/* Add Product Modal */}
            <Modal open={open} onClose={handleClose} size="md" position="center" blur closeOnBackdrop closeOnEsc>
                <div className={`bg-main-100 rounded-lg shadow-xl overflow-hidden ${open ? "animation-zoom-in" : ""}`}>
                    <div className="flex items-center justify-between px-6 py-4 text-main-700">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <i className="bi bi-box" />
                            Add New Product
                        </h3>
                        <button onClick={handleClose}><i className="bi bi-x-lg" /></button>
                    </div>
                    <form className="p-6 space-y-4">
                        <TextInput label="Product Name" labelBgColor="bg-main-100" color="primary" size="md" rounded="md" 
                            value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} required />
                        <TextInput label="Category" labelBgColor="bg-main-100" color="primary" size="md" rounded="md"
                            value={formData.category} onChange={e => setFormData(p => ({...p, category: e.target.value}))} />
                        <div className="grid grid-cols-2 gap-4">
                            <TextInput label="Price" labelBgColor="bg-main-100" color="primary" size="md" rounded="md" type="number"
                                value={formData.price} onChange={e => setFormData(p => ({...p, price: e.target.value}))} />
                            <TextInput label="Stock" labelBgColor="bg-main-100" color="primary" size="md" rounded="md" type="number"
                                value={formData.stock} onChange={e => setFormData(p => ({...p, stock: e.target.value}))} />
                        </div>
                        <div className="flex justify-end gap-3 pt-4 border-t border-main-200">
                            <Button color="neutral" size="sm" variant="outline" onClick={handleClose}>Cancel</Button>
                            <Button color="primary" size="sm"><i className="bi bi-check-lg mr-2" />Add Product</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}


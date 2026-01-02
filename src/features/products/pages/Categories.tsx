import { useState } from "react";
import { Button } from "../../../components/ui/Buttons";
import { Modal } from "../../../components/ui/Modal2";
import { TextInput } from "../../../components/ui/TextInput";

const sampleCategories = [
    { id: 1, name: "Stationery", description: "Notebooks, papers, and writing materials", productCount: 45 },
    { id: 2, name: "Writing", description: "Pens, pencils, markers, and highlighters", productCount: 78 },
    { id: 3, name: "Office Supplies", description: "Staplers, clips, and desk accessories", productCount: 32 },
    { id: 4, name: "Art Supplies", description: "Drawing and painting materials", productCount: 56 },
    { id: 5, name: "Filing", description: "Folders, binders, and filing accessories", productCount: 23 },
];

export function Categories() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "" });

    const handleClose = () => setOpen(false);

    return (
        <div className="flex-1 text-main-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text font-bold">Product Categories</h3>
                <Button color="primary" size="sm" rounded="md" onClick={() => setOpen(true)}>
                    <i className="bi bi-plus-lg mr-2" />
                    Add Category
                </Button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleCategories.map(category => (
                    <div key={category.id} className="bg-main-100 rounded-lg shadow-sm border border-main-200 p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <i className="bi bi-tag text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">{category.name}</h4>
                                    <p className="text-sm text-main-500">{category.productCount} products</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button className="p-1.5 hover:bg-main-200 rounded"><i className="bi bi-pencil text-sm" /></button>
                                <button className="p-1.5 hover:bg-main-200 rounded"><i className="bi bi-trash text-sm" /></button>
                            </div>
                        </div>
                        <p className="text-sm text-main-600 mt-3">{category.description}</p>
                    </div>
                ))}
            </div>

            {/* Add Category Modal */}
            <Modal open={open} onClose={handleClose} size="md" position="center" blur closeOnBackdrop closeOnEsc>
                <div className={`bg-main-100 rounded-lg shadow-xl overflow-hidden ${open ? "animation-zoom-in" : ""}`}>
                    <div className="flex items-center justify-between px-6 py-4 text-main-700">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <i className="bi bi-tags" />
                            Add New Category
                        </h3>
                        <button onClick={handleClose}><i className="bi bi-x-lg" /></button>
                    </div>
                    <form className="p-6 space-y-4">
                        <TextInput label="Category Name" labelBgColor="bg-main-100" color="primary" size="md" rounded="md"
                            value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} required />
                        <TextInput label="Description" labelBgColor="bg-main-100" color="primary" size="md" rounded="md"
                            value={formData.description} onChange={e => setFormData(p => ({...p, description: e.target.value}))} />
                        <div className="flex justify-end gap-3 pt-4 border-t border-main-200">
                            <Button color="neutral" size="sm" variant="outline" onClick={handleClose}>Cancel</Button>
                            <Button color="primary" size="sm"><i className="bi bi-check-lg mr-2" />Add Category</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}


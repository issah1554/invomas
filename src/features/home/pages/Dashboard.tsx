import { DropdownMenu, type DropdownItem } from "../../../components/ui/Dropdown";
import { Modal } from "../../../components/ui/Modal2";
import { useState } from "react";

const items: DropdownItem[] = [
    {
        label: "Profile",
        icon: <i className="bi bi-person"></i>,
    },
    {
        label: "Settings",
        icon: <i className="bi bi-gear"></i>,
        subItems: [
            { label: "Account" },
            {
                label: "Security",
                icon: <i className="bi bi-lock"></i>,
                subItems: [
                    { label: "Passwords" },
                    { label: "2FA" },
                ],
            },
        ],
    },
];


export function Dashboard() {
    const [open, setOpen] = useState<boolean>(false);

    return (
            <div className="flex-1 p-6  text-main-700">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p>Welcome to your dashboard! Here you can find an overview of your activities.</p>

                <div className="mt-6">
                    <DropdownMenu
                        toggler={
                            <div className="flex items-center gap-2">
                                <i className="bi bi-three-dots-vertical text-2xl cursor-pointer text-main-600"></i>
                            </div>
                        }
                        openMode="hover"
                        items={items}
                    />
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                    Open Modal
                </button>

                <Modal                    
                    open={open}
                    onClose={() => setOpen(false)}
                    size="lg"
                    position="right"
                    blur={false}
                    closeOnBackdrop={false}
                >
                    <div className="p-4 mr-3 bg-main-200 border border-main-300 rounded-lg shadow-lg text-main-700 max-h-full overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
                        <p>This is the content of the modal. You can put any information here.</p>
                        {/* Long form content */}
                        <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <button
                            onClick={() => setOpen(false)}
                            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white"
                        >
                            Close Modal
                        </button>
                    </div>
                </Modal>
            </div>
    );
}

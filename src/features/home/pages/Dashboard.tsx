import { AppLayout } from "../../../components/layout/AppLayout";
import { DropdownMenu, type DropdownItem } from "../../../components/ui/Dropdown";

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
    return (
        <AppLayout>
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
            </div>
        </AppLayout>
    );
}

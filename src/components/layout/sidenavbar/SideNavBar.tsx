import {
    SideNavLayout,
    SideNavHeader,
    SideNavMain,
    SideNavFooter,
    useSideNavCollapsed,
    useSideNavPin,
} from "./SideNavBarLayout";

import { NavItems } from "./NavItems";
import { NavItem } from "./NavItem";

function SidebarHeader() {
    const isCollapsed = useSideNavCollapsed();
    const { isPinned, togglePin } = useSideNavPin();

    return (
        <div className={`py-4 flex items-center text-xl font-bold text-primary transition-all duration-300 ${isCollapsed ? 'justify-center px-1' : 'gap-2 px-3'}`}>
            <i className="bi bi-bag text-primary" />
            {!isCollapsed && (
                <>
                    <span className="whitespace-nowrap overflow-hidden flex-1">Stationery</span>
                    <button
                        onClick={togglePin}
                        className={`ml-auto rounded p-1 transition-colors cursor-pointer
                            ${isPinned
                                ? 'text-primary hover:bg-primary/10'
                                : 'text-main-500 hover:text-main-700 hover:bg-main-300'
                            }`}
                        title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
                    >
                        <i className={`bi ${isPinned ? 'bi-pin-fill animation-bounce-in' : 'bi-pin-angle animation-slide-left'} text-sm`} />
                    </button>
                </>
            )}
        </div>
    );
}

function SidebarFooter() {
    const isCollapsed = useSideNavCollapsed();

    return (
        <div className={`py-3 space-y-1 ${isCollapsed ? 'px-1' : 'px-3'}`}>
            <NavItem
                className="rounded-md"
                label="Help & Support"
                to="/help"
                icon={<i className="bi bi-question-circle" />}
            />
            <NavItem
                className="rounded-md"
                label="Logout"
                icon={<i className="bi bi-box-arrow-right" />}
            />
        </div>
    );
}

export function Sidebar() {
    return (
        <SideNavLayout>

            <SideNavHeader sticky={true}>
                <SidebarHeader />
            </SideNavHeader>

            <SideNavMain>
                <div className="py-4 space-y-3">
                    <NavItems
                        items={[
                            { label: "Dashboard", to: "/home", icon: <i className="bi bi-house" /> },
                            {
                                label: "IAM",
                                icon: <i className="bi bi-people" />,
                                subItems: [
                                    { label: "Users", to: "/users", icon: <i className="bi bi-person" /> },
                                    { label: "Roles", to: "/roles", icon: <i className="bi bi-shield" /> },
                                    { label: "Permissions", to: "/permissions", icon: <i className="bi bi-lock" /> },
                                ],
                            },
                            {
                                label: "Products and Services",
                                icon: <i className="bi bi-box" />,
                                subItems: [
                                    { label: "Products", to: "/products", icon: <i className="bi bi-box" /> },
                                    { label: "Categories", to: "/products/categories", icon: <i className="bi bi-tags" /> },
                                    { label: "Services", to: "/services", icon: <i className="bi bi-gear" /> },
                                ],
                            },
                            { label: "Sales", to: "/sales", icon: <i className="bi bi-cart" /> },
                            { label: "Expenses", to: "/expenses", icon: <i className="bi bi-cash-stack" /> },
                            { label: "Purchases", to: "/purchases", icon: <i className="bi bi-bag-plus" /> },
                            { label: "Reports", to: "/reports", icon: <i className="bi bi-bar-chart" /> },
                            { label: "Settings", to: "/settings", icon: <i className="bi bi-gear-wide" /> },
                        ]}
                    />
                </div>
            </SideNavMain>

            <SideNavFooter sticky={true}>
                <SidebarFooter />
            </SideNavFooter>

        </SideNavLayout>
    );
}

import {
    SideNavLayout,
    SideNavHeader,
    SideNavMain,
    SideNavFooter,
} from "./SideNavBarLayout";

import { NavItems } from "./NavItems";
import { NavItem } from "./NavItem";

export function Sidebar() {
    return (
        <SideNavLayout>
            
            <SideNavHeader sticky={true}>
                <div className="px-3 py-4 flex items-center gap-2 text-xl font-bold text-primary">
                    <i className="bi bi-rocket-takeoff text-primary" />
                    MyApp
                    <button className="ml-auto text-main hover:bg-main-400 rounded-sm hover:text-primary-700" title="Collapse">
                        <i className="bi bi-chevron-left hover:scale-125" />
                    </button>
                </div>
            </SideNavHeader>

            <SideNavMain>
                <div className=" py-4 space-y-3">
                    <NavItems
                        items={[
                            { label: "Dashboard", to: "/home", icon: <i className="bi bi-house" /> },
                            { label: "Calendar", to: "/calendar", icon: <i className="bi bi-calendar" />, badge: 3 },
                            {
                                label: "User Management",
                                icon: <i className="bi bi-people" />,
                                subItems: [
                                    { label: "Users", to: "/users" },
                                    { label: "Roles", to: "/roles" },
                                    { label: "Permissions", to: "/permissions" },
                                ],
                            },
                            {
                                label: "Products",
                                icon: <i className="bi bi-box" />,
                                subItems: [
                                    { label: "Products", to: "/products", icon: <i className="bi bi-box" /> },
                                ],
                            },
                        ]}
                    />
                    </div>
            </SideNavMain>

            <SideNavFooter sticky={true}>
                <div className="px-3 py-3 space-y-1">
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
            </SideNavFooter>

        </SideNavLayout>
    );
}

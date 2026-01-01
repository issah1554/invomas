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
                </div>
            </SideNavHeader>

            <SideNavMain>
                <div className=" py-4 space-y-3">
                    <NavItems
                        items={[
                            { label: "Dashboard", to: "/home", icon: <i className="bi bi-house" /> },
                            { label: "Calendar", to: "/calendar", icon: <i className="bi bi-calendar" />, badge: 3 },
                            {
                                label: "ToDo",
                                icon: <i className="bi bi-list-check" />,
                                subItems: [
                                    { label: "All Projects", to: "/projects" },
                                    { label: "Active", to: "/tasks" },
                                    { label: "Archived", to: "/chats" },
                                ],
                            },
                            {
                                label: "Finance",
                                icon: <i className="bi bi-calculator" />,
                                subItems: [
                                    { label: "Accounts", to: "/accounts", icon: <i className="bi bi-cash" /> },
                                    { label: "Obligations", to: "/obligations", icon: <i className="bi bi-credit-card" /> },
                                ],
                            },
                        ]}
                    />
                    </div>
            </SideNavMain>

            <SideNavFooter sticky={true}>
                <div className="px-3 py-3 space-y-1">
                    <NavItem
                        label="Help & Support"
                        to="/help"
                        icon={<i className="bi bi-question-circle" />}
                    />
                    <NavItem
                        label="Logout"
                        icon={<i className="bi bi-box-arrow-right" />}
                    />
                </div>
            </SideNavFooter>

        </SideNavLayout>
    );
}

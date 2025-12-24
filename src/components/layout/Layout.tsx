import { type ReactNode, useEffect, useState } from "react";
import Sidebar from "./SideNavBar";
import TopNav from "./TopNavBar";
import Footer from "./Footer";

interface LayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        return localStorage.getItem("sidebarCollapsed") === "true";
    });

    const [isMobile, setIsMobile] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 992;
            setIsMobile(mobile);

            if (mobile) {
                setIsCollapsed(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", String(isCollapsed));
    }, [isCollapsed]);

    const toggleSidebar = () => {
        if (isMobile) {
            setIsMobileOpen((v) => !v);
        } else {
            setIsCollapsed((v) => !v);
        }
    };

    const closeMobileSidebar = () => {
        if (isMobile) {
            setIsMobileOpen(false);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: "var(--background)" }}
        >
            {/* Top navigation */}
            <TopNav
                toggleSidebar={toggleSidebar}
                isCollapsed={isCollapsed}
                isMobile={isMobile}
            />

            {/* Main content */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar
                    isCollapsed={isCollapsed}
                    isMobile={isMobile}
                    isMobileOpen={isMobileOpen}
                    closeMobileSidebar={closeMobileSidebar}
                />

                {/* Page content */}
                <main
                    className={`flex-1 p-4 transition-[margin-left] duration-300 ease-in-out`}
                    style={{
                        marginLeft: isMobile
                            ? "0"
                            : isCollapsed
                                ? "80px"
                                : "250px",
                        marginTop: "60px",
                        minHeight: "calc(100vh - 120px)",
                        backgroundColor: "var(--background)",
                    }}
                >
                    {children}
                </main>
            </div>

            {/* Footer */}
            <Footer isCollapsed={isCollapsed} isMobile={isMobile} />
        </div>
    );
}

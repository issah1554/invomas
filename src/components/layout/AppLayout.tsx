import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sidebar } from "./sidenavbar/SideNavBar";
import TopNav from "./TopNavBar";
import Footer from "./Footer";
import { SidebarProvider, useSidebar } from "../../contexts/SidebarContext";

/* =======================
   Responsive hook
======================= */
function useResponsive() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return { isMobile };
}

/* =======================
   Layout content
======================= */
function AppLayoutContent() {
    const { isMobile } = useResponsive();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { effectiveCollapsed } = useSidebar();

    const mainMargin = isMobile
        ? "ml-0"
        : effectiveCollapsed
            ? "ml-16"
            : "ml-64";

    return (
        <div className="flex min-h-screen bg-main-100 text-main-900">
            {/* Sidebar */}
            {!isMobile && <Sidebar />}

            {isMobile && sidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-30"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <Sidebar />
                </>
            )}

            {/* Main */}
            <div
                className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${mainMargin}`}
            >
                <TopNav
                    toggleSidebar={() => setSidebarOpen((v) => !v)}
                    isMobile={isMobile}
                />

                <main className="flex-1 overflow-y-auto px-2 sm:p-4 md:px-6 min-w-0">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
}

/* =======================
   Layout wrapper
======================= */
export function AppLayout() {
    return (
        <SidebarProvider>
            <AppLayoutContent />
        </SidebarProvider>
    );
}

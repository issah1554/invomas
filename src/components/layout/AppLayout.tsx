import { useState, useEffect } from "react";
import { Sidebar } from "./sidenavbar/SideNavBar";
import TopNav from "./TopNavBar";
import Footer from "./Footer";
import { SidebarProvider, useSidebar } from "../../contexts/SidebarContext";

// Custom hook to detect screen size
function useResponsive() {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);  // md breakpoint
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);  // lg breakpoint
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return { isMobile, isTablet };
}

function AppLayoutContent({ children }: { children: React.ReactNode }) {
    const { isMobile } = useResponsive();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { effectiveCollapsed } = useSidebar();

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    // Determine margin based on sidebar state
    // w-16 = 4rem = 64px (collapsed), w-64 = 16rem = 256px (expanded)
    const mainMargin = isMobile ? 'ml-0' : effectiveCollapsed ? 'ml-16' : 'ml-64';

    return (
        <div className="flex min-h-screen bg-main-100 text-main-900">

            {/* Sidebar - hidden on mobile, visible on tablet/desktop */}
            {!isMobile && <Sidebar />}

            {/* Mobile sidebar overlay */}
            {isMobile && sidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-30"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <Sidebar />
                </>
            )}

            {/* Main content area - margin adjusts with sidebar */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${mainMargin}`}>
                {/* Top navbar */}
                <TopNav
                    toggleSidebar={toggleSidebar}
                    isMobile={isMobile}
                />

                {/* Scrollable main content */}
                <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 min-w-0">
                    {children}
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppLayoutContent>{children}</AppLayoutContent>
        </SidebarProvider>
    );
}

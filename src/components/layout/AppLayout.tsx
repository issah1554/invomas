import { Sidebar } from "./sidenavbar/SideNavBar";
import TopNav from "./TopNavBar";
import Footer from "./Footer";

export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-main-100 text-main-900">

            {/* Sidebar with fixed width */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top navbar */}
                <TopNav toggleSidebar={() => { }} isCollapsed={false} isMobile={false} />

                {/* Scrollable main content */}
                <main className="flex-1 overflow-y-auto p-4 min-w-0 ml-60">
                    {children}
                </main>

                {/* Footer */}
                <Footer isCollapsed={false} isMobile={false} />
            </div>
        </div>
    );
}

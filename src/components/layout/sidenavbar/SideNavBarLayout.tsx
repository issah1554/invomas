import React from "react";
import {type ReactNode, useEffect, useState } from "react";

type SideNavLayoutProps = {
    children: ReactNode;
    className?: string;
};

type SideNavHeaderProps = {
    children: ReactNode;
    sticky?: boolean;
};

type SideNavMainProps = {
    children: ReactNode;
};

type SideNavFooterProps = {
    children: ReactNode;
    sticky?: boolean;
};

export function SideNavLayout({
    children,
    className = "",
}: SideNavLayoutProps) {
    // Containers for non-sticky content
    const [scrollHeader, setScrollHeader] = useState<ReactNode>(null);
    const [scrollFooter, setScrollFooter] = useState<ReactNode>(null);

    // Containers for sticky content
    const [stickyHeader, setStickyHeader] = useState<ReactNode>(null);
    const [stickyFooter, setStickyFooter] = useState<ReactNode>(null);

    // Provide registration functions to header/footer components
    const context = {
        registerHeader: (node: ReactNode, sticky: boolean) =>
            sticky ? setStickyHeader(node) : setScrollHeader(node),
        registerFooter: (node: ReactNode, sticky: boolean) =>
            sticky ? setStickyFooter(node) : setScrollFooter(node),
    };

    return (
        <SideNavContext.Provider value={context}>
            <aside
                className={`h-screen w-64 flex flex-col overflow-hidden fixed top-0 left-0
                    bg-main-200
                    border-r border-main-300
                    ${className}`}
            >
                {/* Sticky Header */}
                {stickyHeader && (
                    <div className="sticky top-0 z-10 bg-main-200  border-b border-main-300">
                        {stickyHeader}
                    </div>
                )}

                {/* Scrollable area */}
                <div className="flex-1 overflow-y-auto">
                    {/* Non-sticky header */}
                    {scrollHeader}

                    {/* Main content */}
                    {children}

                    {/* Non-sticky footer */}
                    {scrollFooter}
                </div>

                {/* Sticky Footer */}
                {stickyFooter && (
                    <div className="sticky bottom-0 z-10 bg-main-200  border-t border-main-300">
                        {stickyFooter}
                    </div>
                )}
            </aside>
        </SideNavContext.Provider>
    );
}

// ------------------ Context ------------------
type SideNavContextType = {
    registerHeader: (node: ReactNode, sticky: boolean) => void;
    registerFooter: (node: ReactNode, sticky: boolean) => void;
};
const SideNavContext = React.createContext<SideNavContextType | null>(null);

function useSideNav() {
    const ctx = React.useContext(SideNavContext);
    if (!ctx) throw new Error("SideNav components must be used inside SideNavLayout");
    return ctx;
}

// ------------------ Header ------------------
export function SideNavHeader({ children, sticky = true }: SideNavHeaderProps) {
    const { registerHeader } = useSideNav();
    useEffect(() => {
        registerHeader(children, sticky);
    }, [children, sticky]);
    return null; // rendered via context in layout
}

// ------------------ Main ------------------
export function SideNavMain({ children }: SideNavMainProps) {
    return <div className="px-0 py-4 space-y-3">{children}</div>;
}

// ------------------ Footer ------------------
export function SideNavFooter({ children, sticky = true }: SideNavFooterProps) {
    const { registerFooter } = useSideNav();
    useEffect(() => {
        registerFooter(children, sticky);
    }, [children, sticky]);
    return null; // rendered via context in layout
}


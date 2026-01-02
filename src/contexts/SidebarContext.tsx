import React, { createContext, useContext, useState, type ReactNode } from "react";

type SidebarContextType = {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    isPinned: boolean;
    setIsPinned: (value: boolean) => void;
    togglePin: () => void;
    effectiveCollapsed: boolean;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
    // Expanded by default
    const [isCollapsed, setIsCollapsed] = useState(false);
    // Pinned by default (sidebar stays expanded)
    const [isPinned, setIsPinned] = useState(true);

    const togglePin = () => {
        setIsPinned(prev => {
            if (!prev) {
                setIsCollapsed(false); // Expand when pinning
            }
            return !prev;
        });
    };

    // When pinned, always show as expanded
    const effectiveCollapsed = isPinned ? false : isCollapsed;

    return (
        <SidebarContext.Provider
            value={{
                isCollapsed,
                setIsCollapsed,
                isPinned,
                setIsPinned,
                togglePin,
                effectiveCollapsed,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const ctx = useContext(SidebarContext);
    if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider");
    return ctx;
}

export function useSidebarCollapsed() {
    const ctx = useContext(SidebarContext);
    return ctx?.effectiveCollapsed ?? false;
}

export function useSidebarPin() {
    const ctx = useContext(SidebarContext);
    return {
        isPinned: ctx?.isPinned ?? false,
        togglePin: ctx?.togglePin ?? (() => {}),
    };
}


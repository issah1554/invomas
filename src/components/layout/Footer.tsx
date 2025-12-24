import { useLocation } from "react-router-dom";

interface FooterProps {
    isCollapsed: boolean;
    isMobile: boolean;
}

export default function Footer({ isCollapsed, isMobile }: FooterProps) {
    const location = useLocation();

    // You can add location-based logic if needed
    const shouldAdjustMargin = !location.pathname.startsWith("/fullscreen-route");

    return (
        <footer
            className={`text-center py-3 mt-auto ${isCollapsed && !isMobile ? 'collapsed' : ''
                }`}
            style={{
                marginLeft: shouldAdjustMargin
                    ? (isMobile ? '0' : isCollapsed ? '80px' : '250px') : '0',
                transition: 'margin-left 0.3s ease',
                backgroundColor: "var(--surface)",
                borderTop: "1px solid var(--border)",
                color: "var(--text)"
            }}
        >
            © {new Date().getFullYear()} Databenki Group. All rights reserved.
        </footer>
    );
}
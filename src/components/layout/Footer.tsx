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
            className={`text-center bg-main-100 border-none border-main-200 mt-auto text-main-700 py-3 ${isCollapsed && !isMobile ? 'collapsed' : ''
                }`}
            style={{
                marginLeft: shouldAdjustMargin
                    ? (isMobile ? '0' : isCollapsed ? '80px' : '250px') : '0',
                transition: 'margin-left 0.3s ease',
            }}
        >
            © {new Date().getFullYear()} <a href="https://databenki.com" target="_blank" className="underline text-primary hover:text-accent">Dira</a> . All rights reserved.
        </footer>
    );
}
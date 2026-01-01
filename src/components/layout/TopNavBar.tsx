import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import useAuth from "../../features/auth/hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";
import Avatar from "../ui/Avatar";

interface TopNavProps {
    toggleSidebar: () => void;
    isCollapsed: boolean;
    isMobile: boolean;
}

export default function TopNav({
    toggleSidebar,
    isCollapsed,
    isMobile,
}: TopNavProps) {

    const { toggleTheme } = useTheme();
    const { user } = useAuth();

    const [open, setOpen] = useState<"notif" | "msg" | "profile" | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    /* Close dropdowns on click outside */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setOpen(null);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <nav
            ref={navRef}
            className={`h-16 border-none border-main-200 bg-main-100 ${isCollapsed && !isMobile ? "ml-20" : "ml-0"
                }`}
        >
            <div className="h-full px-4 flex items-center justify-between">
                {/* Sidebar toggle */}
                <button
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                    className="text-main-500 hover:text-main-700"
                >
                    <i className="bi bi-list text-2xl" />
                </button>

                {/* Right section */}
                <div className="flex items-center gap-4">
                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="text-main-500 hover:text-main-700"
                        aria-label="Toggle theme"
                    >
                        <i className="bi bi-circle-half text-xl" />
                    </button>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setOpen(open === "notif" ? null : "notif")}
                            className="relative text-main-500 hover:text-main-700"
                        >
                            <i className="bi bi-bell text-xl" />
                            <span className="absolute -top-1 -right-2 text-[10px] px-1.5 rounded-full bg-red-600 text-white">
                                3
                            </span>
                        </button>

                        {open === "notif" && (
                            <div className="absolute right-0 mt-2 w-64 bg-main-200 border border-main-300 rounded-sm shadow-none shadow-main-300 text-main-700 text-sm z-50">
                                <div className="px-4 py-2 font-semibold">Notifications</div>
                                <div className="border-t border-main-300">
                                    <div className="px-4 py-2 hover:bg-main-300">
                                        New user registered
                                    </div>
                                    <div className="px-4 py-2 hover:bg-main-300">
                                        Backup completed
                                    </div>
                                    <div className="px-4 py-2 hover:bg-main-300">
                                        Payment received
                                    </div>
                                </div>
                                <Link
                                    to="/notifications"
                                    className="block text-center px-4 py-2 border-t border-main-300 hover:border-primary-300 text-primary-700 hover:bg-primary-200 rounded-b-sm"
                                >
                                    View all
                                </Link>
                            </div>
                        )}
                    </div>



                    {/* Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setOpen(open === "profile" ? null : "profile")}
                            className="focus:outline-none"
                        >
                            <Avatar
                                alt="Issah Xevier"
                                size={32}
                            />
                        </button>

                        {open === "profile" && (
                            <div className="absolute right-0 mt-2 w-72 bg-main-200 border border-main-300 rounded-md shadow-lg text-sm z-50">
                                <div className="px-4 py-4 text-center border-b border-main-300">
                                    <img
                                        src={
                                            user?.avatar ||
                                            "https://res.cloudinary.com/dy6frwbfh/image/upload/cyj3kqoatd0i0437py8f.jpg"
                                        }
                                        className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                                    />
                                    <h5 className="font-semibold">
                                        {user?.first_name} {user?.last_name}
                                    </h5>
                                    <p className="text-main-500 text-xs">{user?.email}</p>
                                    {user?.roles?.length > 0 && (
                                        <p className="text-main-500 text-xs mt-1">
                                            Roles: {user.roles.join(", ")}
                                        </p>
                                    )}
                                </div>

                                <Link
                                    to="/settings/profile"
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-main-300"
                                >
                                    <i className="bi bi-person" /> My Profile
                                </Link>

                                <Link
                                    to="/settings"
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-main-300"
                                >
                                    <i className="bi bi-gear" /> Settings
                                </Link>

                                <Link
                                    to="/auth/logout"
                                    className="flex items-center gap-2 px-4 py-2 text-danger-600 border-t border-main-300 hover:bg-danger-100 hover:border-danger-300 rounded-b-sm"
                                >
                                    <i className="bi bi-box-arrow-right" /> Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

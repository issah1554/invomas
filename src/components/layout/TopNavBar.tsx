import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "../ui/Buttons";
import useAuth from "../../features/auth/hooks/useAuth";
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
            className={`h-16 bg-[var(--surface)] border-b border-main-200 ${isCollapsed && !isMobile ? "ml-20" : "ml-0"
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
                            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg text-sm z-50">
                                <div className="px-4 py-2 font-semibold">Notifications</div>
                                <div className="border-t">
                                    <div className="px-4 py-2 hover:bg-main-50">
                                        New user registered
                                    </div>
                                    <div className="px-4 py-2 hover:bg-main-50">
                                        Backup completed
                                    </div>
                                    <div className="px-4 py-2 hover:bg-main-50">
                                        Payment received
                                    </div>
                                </div>
                                <Link
                                    to="/notifications"
                                    className="block text-center px-4 py-2 border-t text-primary hover:bg-main-50"
                                >
                                    View all
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Messages */}
                    {/* <div className="relative">
                        <button
                            onClick={() => setOpen(open === "msg" ? null : "msg")}
                            className="relative text-main-500 hover:text-main-700"
                        >
                            <i className="bi bi-envelope text-xl" />
                            <span className="absolute -top-1 -right-2 text-[10px] px-1.5 rounded-full bg-primary text-white">
                                5
                            </span>
                        </button>

                        {open === "msg" && (
                            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg text-sm z-50">
                                <div className="px-4 py-2 font-semibold">Messages</div>
                                <div className="border-t">
                                    <div className="px-4 py-2 hover:bg-main-50">
                                        New message from Alice
                                    </div>
                                    <div className="px-4 py-2 hover:bg-main-50">
                                        Project update from Bob
                                    </div>
                                </div>
                                <Link
                                    to="/chat"
                                    className="block text-center px-4 py-2 border-t text-primary hover:bg-main-50"
                                >
                                    View all
                                </Link>
                            </div>
                        )}
                    </div> */}

                    {/* Profile */}
                    {/* <div className="relative">
                        <Button
                            variant="text"
                            onClick={() => setOpen(open === "profile" ? null : "profile")}
                            className="flex items-center gap-2"
                        >
                            <Avatar
                                alt="Profile"
                                src="https://res.cloudinary.com/dy6frwbfh/image/upload/cyj3kqoatd0i0437py8f.jpg"
                            />
                            <span className="hidden lg:inline font-semibold">
                                @{user?.username || user?.email.split("@")[0]}
                            </span>
                        </Button>

                        {open === "profile" && (
                            <div className="absolute right-0 mt-2 w-72 bg-white border rounded-md shadow-lg text-sm z-50">
                                <div className="px-4 py-4 text-center border-b">
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
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-main-50"
                                >
                                    <i className="bi bi-person" /> My Profile
                                </Link>

                                <Link
                                    to="/settings"
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-main-50"
                                >
                                    <i className="bi bi-gear" /> Settings
                                </Link>

                                <Link
                                    to="/auth/logout"
                                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 border-t"
                                >
                                    <i className="bi bi-box-arrow-right" /> Logout
                                </Link>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        </nav>
    );
}

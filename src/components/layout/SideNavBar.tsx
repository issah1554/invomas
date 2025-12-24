import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "../ui/Buttons";
import useAuth  from "../../features/auth/hooks/useAuth";
import Avatar from "../ui/Avatar";
interface TopNavProps {
    toggleSidebar: () => void;
    isCollapsed: boolean;
    isMobile: boolean;
}

export default function TopNav({ toggleSidebar, isCollapsed, isMobile }: TopNavProps) {

    const { user } = useAuth(); // get logged-in user

    return (
        <nav className={`top-nav ${isCollapsed && !isMobile ? 'collapsed' : ''}`} style={{
            backgroundColor: "var(--surface)"
        }}>
            <div className="container-fluid d-flex justify-content-between align-items-center h-100">
                {/* Left side: Toggle Button */}
                <button
                    className="navbar-toggler border-0"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <i className="bi bi-list text-secondary" style={{ fontSize: "1.8rem" }}></i>
                </button>

                {/* Right side: Icons */}
                <div className="d-flex align-items-center gap-3">
                    {/* Notification Dropdown */}
                    <div className="dropdown">
                        <span
                            role="button"
                            className="text-secondary position-relative"
                            id="notificationDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="bi bi-bell" style={{ fontSize: "1.3rem" }}></i>
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                style={{ fontSize: "0.6rem" }}
                            >
                                3<span className="visually-hidden">unread notifications</span>
                            </span>
                        </span>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="notificationDropdown"
                            style={{ minWidth: "250px" }}
                        >
                            <li>
                                <span className="dropdown-item-text">Notifications</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <span className="dropdown-item">New user registered</span>
                            </li>
                            <li>
                                <span className="dropdown-item">Backup completed</span>
                            </li>
                            <li>
                                <span className="dropdown-item">Payment received</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <Link className="dropdown-item text-center" to="/notifications">
                                    View all
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Unread Message Icon */}
                    <div className="dropdown">
                        <span
                            role="button"
                            className="text-secondary position-relative"
                            id="messageDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="bi bi-envelope" style={{ fontSize: "1.3rem" }}></i>
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                                style={{ fontSize: "0.6rem" }}
                            >
                                5<span className="visually-hidden">unread messages</span>
                            </span>
                        </span>

                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="messageDropdown"
                            style={{ minWidth: "250px" }}
                        >
                            <li>
                                <span className="dropdown-item-text">Messages</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <span className="dropdown-item">New message from Alice</span>
                            </li>
                            <li>
                                <span className="dropdown-item">Project update from Bob</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <Link className="dropdown-item text-center" to="/chat">
                                    View all
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Profile Dropdown */}
                    {/* <div className="dropdown">


                        <ul className="dropdown-menu dropdown-menu-end p-0" aria-labelledby="profileDropdown">
                            <li>
                                <div className="user-box px-4 py-3 text-center border-bottom">
                                    <div className="avatar-lg mx-auto mb-3">
                                        <img
                                            src={user?.avatar || "https://res.cloudinary.com/dy6frwbfh/image/upload/cyj3kqoatd0i0437py8f.jpg"}
                                            alt="Profile"
                                            className="avatar-img rounded-circle"
                                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="u-text">
                                        <h5 className="mb-1">{user?.first_name + ' ' + user?.last_name || 'Full Name'}</h5>
                                        <p className="text-muted small mb-2">{user?.email}</p>
                                        {user?.roles && user.roles.length > 0 && (
                                            <p className="text-muted small mb-0">Roles: {user.roles.join(", ")}</p>
                                        )}
                                    </div>
                                </div>
                            </li>

                            <li>
                                <hr className="dropdown-divider my-0" />
                            </li>

                            <li>
                                <Link className="dropdown-item py-2" to="/settings/profile">
                                    <i className="bi bi-person me-2"></i> My Profile
                                </Link>
                            </li>

                            <li>
                                <Link className="dropdown-item py-2" to="/settings">
                                    <i className="bi bi-gear me-2"></i> Settings
                                </Link>
                            </li>

                            <li>
                                <hr className="dropdown-divider my-0" />
                            </li>

                            <li>
                                <Link className="dropdown-item py-2 text-danger" to="/auth/logout">
                                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                                </Link>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </nav>
    );
}
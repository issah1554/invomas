import React, { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import ScrollbarWrapper from "../../../components/TextInput copy";

interface AuthLayoutProps {
    children: React.ReactNode;
    leftCol?: string;
    rightCol?: string;
    rightClassName?: string;
    rightStyle?: CSSProperties;
    imageSrc?: string;
    logoSrc?: string;
    appName?: string;
    navIcon?: React.ReactNode;
    navLink?: string;
}

export default function AuthContainer({
    children,
    leftCol = "col-md-6",
    rightCol = "col-md-6",
    rightClassName = "",
    rightStyle = {},
    imageSrc = "/auth-cover.png",
    logoSrc = "/wifi-icon.png",
    appName = "PayNet",
    navIcon,
    navLink,
}: AuthLayoutProps) {
    return (
        <div className="d-flex vh-100 bg-light">
            {/* Left Column — Image Section */}
            <div
                className={`d-none d-md-flex ${leftCol} bg-body-secondary position-relative justify-content-center align-items-center overflow-hidden`}
            >
                <Link
                    to="/"
                    className="position-absolute top-0 start-0 m-4 fw-bold text-primary fs-4"
                >
                    <div className="d-flex align-items-center gap-2 mt-2">
                        {logoSrc && (
                            <img
                                src={logoSrc}
                                alt={`${appName} Logo`}
                                style={{ width: "45px", height: "45px", objectFit: "contain" }}
                            />
                        )}
                        {appName}
                    </div>
                </Link>

                <img
                    src={imageSrc}
                    alt="Auth Cover"
                    className="img-fluid w-100 h-auto object-fit-contain p-5"
                    style={{ maxWidth: "550px" }}
                />
            </div>

            {/* Right Column — Form Section */}
            <div
                className={`${rightCol} d-flex flex-column position-relative col-12 ${rightClassName}`}
                style={{
                    ...rightStyle,
                }}
            >
                {/* Sticky navIcon */}
                {navIcon && navLink && (
                    <div
                        style={{
                            position: "absolute",
                            top: "16px",
                            right: "16px",
                            zIndex: 10,
                        }}
                    >
                        <Link to={navLink}>{navIcon}</Link>
                    </div>
                )}

                {/* Scrollable area */}
                <ScrollbarWrapper
                    style={{
                        overflowY: "auto",
                        maxHeight: "100vh",
                        paddingTop: "48px", // optional: leave space below navIcon
                    }}
                >
                    <div className="w-100 px-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
                        {children}
                    </div>
                </ScrollbarWrapper>
            </div>
        </div>
    );
}
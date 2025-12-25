import React, { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import ScrollbarWrapper from "../../../components/ui/ScrollbarWrapper";

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
    rightClassName = "",
    rightStyle = {},
    navIcon,
    navLink,
}: AuthLayoutProps) {
    return (
        <>
            <ScrollbarWrapper style={{ overflowY: "auto", maxHeight: "100vh" }} >
                <div className="flex min-h-screen bg-main-100">

                    {/* Left Column — Image Section */}
                    <div className="relative hidden md:flex md:w-1/2 items-center justify-center overflow-hidden">
                        <Link
                            to="/"
                            className="absolute top-4 left-4 flex items-center gap-2 text-primary font-bold text-xl"
                        >
                            <img
                                src="/invomax.svg"
                                alt={`Logo`}
                                className="w-11 h-11 object-contain"
                            />
                            <span>Inv.max</span>
                        </Link>

                        <img
                            src="/payment-cover.png"
                            alt="Auth Cover"
                            className="w-full max-w-137.5 p-10 object-contain"
                        />
                    </div>

                    {/* Right Column — Form Section */}
                    <div
                        className={`relative bg-main-200 flex w-full md:w-1/2 flex-col ${rightClassName}`}
                        style={rightStyle}
                    >
                        {/* Floating navIcon */}
                        {navIcon && navLink && (
                            <div className="absolute top-4 right-4 z-10">
                                <Link to={navLink}>{navIcon}</Link>
                            </div>
                        )}


                        <div className="mx-auto w-full max-w-175 px-4">
                            {children}
                        </div>
                    </div>
                </div>
            </ScrollbarWrapper >
        </>
    );
}

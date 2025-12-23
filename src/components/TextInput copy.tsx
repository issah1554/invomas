import React, { type CSSProperties } from "react";

interface ScrollbarWrapperProps {
    children: React.ReactNode;
    thumbColor?: string;
    trackColor?: string;
    thumbHoverColor?: string;
    width?: string;
    style?: CSSProperties;
}

export default function ScrollbarWrapper({
    children,
    thumbColor = "var(--color-primary)",
    trackColor = "rgba(0, 0, 0, 0)",
    thumbHoverColor = "var(--color-primary-dark)",
    width = "8px",
    style = {},
}: ScrollbarWrapperProps) {
    // Generate a unique class name to avoid conflicts
    const uniqueClass = `scrollbar-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div
            className={uniqueClass}
            style={style}
        >
            {children}
            <style>
                {`
          .${uniqueClass} {
            scrollbar-width: thin; /* Firefox */
            scrollbar-color: ${thumbColor} ${trackColor};
          }

          .${uniqueClass}::-webkit-scrollbar {
            width: ${width};
          }

          .${uniqueClass}::-webkit-scrollbar-track {
            background: ${trackColor};
            border-radius: 4px;
          }

          .${uniqueClass}::-webkit-scrollbar-thumb {
            background-color: ${thumbColor};
            border-radius: 4px;
            border: 2px solid ${trackColor};
          }

          .${uniqueClass}::-webkit-scrollbar-thumb:hover {
            background-color: ${thumbHoverColor};
          }
        `}
            </style>
        </div>
    );
}
interface ButtonProps {
    color: "primary" | "secondary" | "accent" | "neutral" | "success" | "warning" | "error" | "info" | "light" | "dark";
    size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    variant?: "solid" | "outline" | "text";
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    className?: string;
    children: React.ReactNode;
}

export function Button({ color, size, variant = "solid", rounded = "sm", children, className }: ButtonProps) {
    // rounded classes
    const roundedClasses = {
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full"
    };

    // Base classes (removed rounded-full from base)
    const baseClasses = "font-sans font-medium shadow";

    // Size classes
    const sizes = {
        xs: "text-xs px-2 py-1",
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-5 py-2.5",
        xl: "text-xl px-6 py-3",
        "2xl": "text-2xl px-7 py-3.5",
    };

    // Color mapping for different variants
    const colorClasses = {
        primary: {
            solid: "bg-primary text-white hover:bg-primary/90",
            outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/10",
            text: "text-primary bg-transparent hover:bg-primary/10"
        },
        secondary: {
            solid: "bg-secondary text-white hover:bg-secondary/90",
            outline: "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary/10",
            text: "text-secondary bg-transparent hover:bg-secondary/10"
        },
        accent: {
            solid: "bg-accent text-white hover:bg-accent/90",
            outline: "border-2 border-accent text-accent bg-transparent hover:bg-accent/10",
            text: "text-accent bg-transparent hover:bg-accent/10"
        },
        neutral: {
            solid: "bg-neutral text-white hover:bg-neutral/90",
            outline: "border-2 border-neutral text-neutral bg-transparent hover:bg-neutral/10",
            text: "text-neutral bg-transparent hover:bg-neutral/10"
        },
        success: {
            solid: "bg-success text-white hover:bg-success/90",
            outline: "border-2 border-success text-success bg-transparent hover:bg-success/10",
            text: "text-success bg-transparent hover:bg-success/10"
        },
        warning: {
            solid: "bg-warning text-white hover:bg-warning/90",
            outline: "border-2 border-warning text-warning bg-transparent hover:bg-warning/10",
            text: "text-warning bg-transparent hover:bg-warning/10"
        },
        error: {
            solid: "bg-error text-white hover:bg-error/90",
            outline: "border-2 border-error text-error bg-transparent hover:bg-error/10",
            text: "text-error bg-transparent hover:bg-error/10"
        },
        info: {
            solid: "bg-info text-white hover:bg-info/90",
            outline: "border-2 border-info text-info bg-transparent hover:bg-info/10",
            text: "text-info bg-transparent hover:bg-info/10"
        },
        light: {
            solid: "bg-light text-black hover:bg-light/90",
            outline: "border-2 border-light text-light bg-transparent hover:bg-light/10",
            text: "text-light bg-transparent hover:bg-light/10"
        },
        dark: {
            solid: "bg-dark text-white hover:bg-dark/80 hover:border-neutral-900 hover:border-2 hover:text-neutral-500",
            outline: "border-2 border-dark text-dark bg-transparent hover:bg-dark/10",
            text: "text-dark bg-transparent hover:bg-dark/10"
        }
    };

    // Get the appropriate classes based on color and variant
    const variantClasses = colorClasses[color][variant];

    // Combine all classes
    const classes = `${baseClasses} ${roundedClasses[rounded]} ${sizes[size]} ${variantClasses} ${className}`;

    return (
        <button className={classes}>
            {children}
        </button>
    );
}
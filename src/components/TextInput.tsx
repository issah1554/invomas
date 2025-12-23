import React from "react";

interface TextInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "pattern" | "required"> {
    label?: string;
    helperText?: string;
    color:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "light"
    | "dark";
    size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    variant?: "solid" | "outline" | "text";
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
    id?: string;
    pattern?: string;
    required?: boolean;
}

export function TextInput({
    label,
    helperText,
    color,
    size,
    variant = "outline",
    rounded = "sm",
    type = "text",
    placeholder,
    value,
    onChange,
    disabled = false,
    id,
    pattern,
    required,
    ...rest
}: TextInputProps) {
    const inputId = id ?? React.useId();

    const [touched, setTouched] = React.useState(false);
    const [invalid, setInvalid] = React.useState(false);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setTouched(true);

        const value = e.currentTarget.value;
        const emailRegex = pattern ? new RegExp(pattern) : /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (type === "email") {
            setInvalid(!emailRegex.test(value));
            return;
        } else if (type === "password") {
            setInvalid(value.length < 8);
            return;
        }

        setInvalid(!emailRegex.test(value));
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        onChange?.(e);

        if (touched) {
            setInvalid(!e.currentTarget.validity.valid);
        }
    };

    const effectiveColor = invalid ? "error" : color;

    const roundedClasses = {
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
    };
    /* Base classes */
    const baseClasses =
        "font-sans shadow-sm focus:outline-none focus:ring-2 transition disabled:opacity-60 disabled:cursor-not-allowed";

    const sizes = {
        xs: "text-xs px-2 py-1",
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-5 py-2.5",
        xl: "text-xl px-6 py-3",
        "2xl": "text-2xl px-7 py-3.5",
    };

    const colorClasses = {
        primary: {
            solid: "bg-primary text-white placeholder-white/70 focus:ring-primary",
            outline:
                "bg-transparent border border-primary text-primary placeholder-primary/60 focus:ring-primary",
            text: "bg-transparent text-primary placeholder-primary/60 focus:ring-primary",
        },
        secondary: {
            solid:
                "bg-secondary text-white placeholder-white/70 focus:ring-secondary",
            outline:
                "bg-transparent border border-secondary text-secondary placeholder-secondary/60 focus:ring-secondary",
            text: "bg-transparent text-secondary placeholder-secondary/60 focus:ring-secondary",
        },
        accent: {
            solid: "bg-accent text-white placeholder-white/70 focus:ring-accent",
            outline:
                "bg-transparent border border-accent text-accent placeholder-accent/60 focus:ring-accent",
            text: "bg-transparent text-accent placeholder-accent/60 focus:ring-accent",
        },
        neutral: {
            solid: "bg-neutral text-white placeholder-white/70 focus:ring-neutral",
            outline:
                "bg-transparent border border-neutral text-neutral placeholder-neutral/60 focus:ring-neutral",
            text: "bg-transparent text-neutral placeholder-neutral/60 focus:ring-neutral",
        },
        success: {
            solid:
                "bg-success text-white placeholder-white/70 focus:ring-success",
            outline:
                "bg-transparent border border-success text-success placeholder-success/60 focus:ring-success",
            text: "bg-transparent text-success placeholder-success/60 focus:ring-success",
        },
        warning: {
            solid:
                "bg-warning text-white placeholder-white/70 focus:ring-warning",
            outline:
                "bg-transparent border border-warning text-warning placeholder-warning/60 focus:ring-warning",
            text: "bg-transparent text-warning placeholder-warning/60 focus:ring-warning",
        },
        error: {
            solid: "bg-error text-white placeholder-white/70 focus:ring-error",
            outline:
                "bg-transparent border border-error text-error placeholder-error/60 focus:ring-error",
            text: "bg-transparent text-error placeholder-error/60 focus:ring-error",
        },
        info: {
            solid: "bg-info text-white placeholder-white/70 focus:ring-info",
            outline:
                "bg-transparent border border-info text-info placeholder-info/60 focus:ring-info",
            text: "bg-transparent text-info placeholder-info/60 focus:ring-info",
        },
        light: {
            solid: "bg-light text-black placeholder-black/50 focus:ring-light",
            outline:
                "bg-transparent border border-light text-light placeholder-light/60 focus:ring-light",
            text: "bg-transparent text-light placeholder-light/60 focus:ring-light",
        },
        dark: {
            solid: "bg-dark text-white placeholder-white/60 focus:ring-dark",
            outline:
                "bg-transparent border border-dark text-dark placeholder-dark/60 focus:ring-dark",
            text: "bg-transparent text-dark placeholder-dark/60 focus:ring-dark",
        },
    };

    const variantClasses = colorClasses[effectiveColor][variant];

    return (
        <div className="flex flex-col gap-1 items-start text-left">
            {label && (
                <label
                    htmlFor={inputId}
                    className={`text-sm font-medium ml-2 ${colorClasses[effectiveColor].text}`}
                >
                    {label}
                </label>
            )}

            <input
                {...rest}
                id={inputId}
                type={type}
                pattern={pattern}
                required={required}
                className={`${baseClasses} ${roundedClasses[rounded]} ${sizes[size]} ${variantClasses} w-full`}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                aria-invalid={invalid}
                aria-describedby={helperText ? `${inputId}-help` : undefined}
            />

            {helperText && (
                <p
                    id={`${inputId}-help`}
                    className={`text-xs ml-2 ${colorClasses[effectiveColor].text}`}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
}
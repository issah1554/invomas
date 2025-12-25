import { useState, useRef, useEffect } from "react";

export interface Option {
    value: string;
    label: string;
}

type SelectColor = "primary" | "secondary" | "neutral" | "accent";

interface Select2Props {
    options: Option[];
    multiple?: boolean;
    placeholder?: string;
    color?: SelectColor;
}

const colorStyles: Record<SelectColor, {
    ring: string;
    text: string;
    bg: string;
    hover: string;
}> = {
    neutral: {
        ring: "border-2 border-main focus:ring-2 focus:ring-main focus:border-none focus:outline-none",
        text: "text-main",
        bg: "bg-main/10",
        hover: "hover:bg-main/5 text-main",
    },
    primary: {
        ring: "border-2 border-primary focus:ring-2 focus:ring-primary focus:border-none focus:outline-none",
        text: "text-primary",
        bg: "bg-primary/10",
        hover: "hover:bg-primary/5 text-main",
    },
    secondary: {
        ring: "border-2 border-secondary focus:ring-2 focus:ring-secondary focus:border-none focus:outline-none",
        text: "text-secondary",
        bg: "bg-secondary/10  text-main",
        hover: "hover:bg-secondary/5",
    },
    accent: {
        ring: "border-2 border-accent focus:ring-2 focus:ring-accent focus:border-none focus:outline-none",
        text: "text-accent",
        bg: "bg-accent/10 text-main",
        hover: "hover:bg-accent/5",
    }
};


export default function Select2({
    options,
    multiple = false,
    placeholder = "Search...",
    color = "primary",
}: Select2Props) {
    const [inputValue, setInputValue] = useState("");
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [showOptions, setShowOptions] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const styles = colorStyles[color];

    const uniqueOptions = Array.from(
        new Map(options.map(o => [o.value, o])).values()
    );

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setShowOptions(false);
                setIsFocused(false);

                if (!multiple && selectedValues.length > 0) {
                    const selectedOption = uniqueOptions.find(
                        o => o.value === selectedValues[0]
                    );
                    if (selectedOption) setInputValue(selectedOption.label);
                }
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () =>
            document.removeEventListener("click", handleClickOutside);
    }, [selectedValues, multiple, uniqueOptions]);

    const handleSelect = (option: Option) => {
        if (multiple) {
            setSelectedValues(prev =>
                prev.includes(option.value)
                    ? prev.filter(v => v !== option.value)
                    : [...prev, option.value]
            );
            setInputValue("");
        } else {
            setSelectedValues([option.value]);
            setInputValue(option.label);
            setShowOptions(false);
        }
    };

    const filteredOptions = uniqueOptions.filter(o =>
        o.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div ref={containerRef} className="relative w-full max-w-xs font-inter">
            <input
                type="text"
                className={`
                    w-full cursor-pointer rounded
                    px-3 py-2 transition
                    ${styles.ring} ${styles.text}
                `}
                placeholder={
                    multiple && selectedValues.length > 0
                        ? `${selectedValues.length} selected`
                        : placeholder
                }
                value={
                    !multiple && !isFocused && selectedValues.length > 0
                        ? uniqueOptions.find(
                            o => o.value === selectedValues[0]
                        )?.label ?? ""
                        : inputValue
                }
                onChange={e => setInputValue(e.target.value)}
                onFocus={() => {
                    setShowOptions(true);
                    setIsFocused(true);
                    if (!multiple) setInputValue("");
                }}
            />

            {showOptions && (
                <div className="absolute z-50 mt-1 max-h-44 w-full overflow-y-auto rounded-none border-2 border-main-300 bg-main-200 shadow-none">
                    {filteredOptions.length === 0 ? (
                        <div className="px-3 py-2 text-sm italic text-main">
                            No items found
                        </div>
                    ) : (
                        filteredOptions.map(option => {
                            const isSelected = selectedValues.includes(
                                option.value
                            );
                            return (
                                <div
                                    key={option.value}
                                    onClick={() => handleSelect(option)}
                                    className={`
                                        px-3 py-2 cursor-pointer transition
                                        ${styles.hover}
                                        ${isSelected ? `${styles.text} ${styles.bg} font-semibold` : ""}
                                    `}
                                >
                                    {option.label}
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}

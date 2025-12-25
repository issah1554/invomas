export interface Table{
    columns: Array<{
        header: string;
        accessor: string;
        width?: string | number;
        sortable?: boolean;
        align?: "left" | "center" | "right";
    }>;
    data: Array<Record<string, any>>;
    loading?: boolean;
    error?: string;
}

export interface Avatar {
    src?: string;
    alt: string;
    size?: number;
    initials?: string;
    className?: string;
    status?: "online" | "offline" | "away";
    shape?: "circle" | "rounded";
    showEditButton?: boolean;
    onEdit?: () => void;
    style?: React.CSSProperties; // allow custom styles
}

export interface DropdownOption<T = string> {
    label: string;
    value: T;
    icon?: React.ReactNode;
    disabled?: boolean;
}

export interface DropdownProps<T = string> {
    options: DropdownOption<T>[];

    // State control
    value?: T;
    defaultValue?: T;

    // Events
    onChange?: (value: T, option: DropdownOption<T>) => void;
    onOpen?: () => void;
    onClose?: () => void;

    // UI  
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    className?: string;

    // Form integration
    name?: string;
    required?: boolean;
}

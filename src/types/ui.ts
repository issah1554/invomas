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
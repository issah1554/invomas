type base64id = string; // e.g. "xyU29tZUJhc"

export interface User {
    id: base64id;
    firstName: string;
    lastName: string;
    email: string;
    username?: string;
    password: string;
    status: "active" | "banned";
    role: Role;
    avatarUrl?: string;
    phone?: number;
    gender: "M" | "F";
    nidaNumber?: number;
    twoFactorAuth: "enabled" | "disabled";
    dateJoined: Date;
}

export interface Role{
    id: number;
    name: string;
    description?: string;
    permissions: Permission[];
}

export interface Permission {
    id: number;
    name: string;
    description?: string;
}

export interface Notification {
    id: number;
    type: 'email' | 'sms' | 'push' | 'in-app';
    category: "projects" | "tasks" | "works" | "chats" | "security";
    title?: string;
    message: string;
    metadata?: object;
    isRead: boolean;
    timeAgo?: string;
}



export interface Snapshot {
    id: number;
    entityType: string;
    metrics: {
        [metricName: string]: number;
    };
    createdAt: string;
}

export interface Invoice {
    id: base64id;
    invoiceNumber: number;
    issuedDate: Date;
    dueDate: Date;
    status: "draft" | "sent" | "paid";
    currency: "TZS" | "USD";
    createdBy: Pick<User, "id" | "avatarUrl" | "username">;
    issuedFor: {
        id?: string;
        name: "project" | "taskBudget" | "salaryAdvance" | "salaryInstallment";
        description?: string;
    };
    metadata: {
        siteLocation?: string;
        customer: {
            id?: User['id'];
            name: string;
            address?: string;
            phone: number;
            email?: string;
            tin?: string;
        };

    };
    items: Array<{
        id: number;
        description: string;
        quantity: number;
        unit: string;
        unitPrice: number;
        total: number;
    }>;
    totals: {
        subTotal: number;
        taxAmount?: number | 0;
        discount?: number | 0;
        grandTotal: number;
    };
}
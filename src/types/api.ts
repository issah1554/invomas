export interface ApiResponse {
    status: "success" | "error" | "fail" | "partial"; // error = server error ::: fail = client error
    message: string;
    data?: {} | [] | null;
    meta?: {
        filters?: {
            search?: string;
            sort: string;
            order: "ASC" | "DSC";
            dateRange: {
                from: Date;
                to: Date;
            };
            include?: [];
            exclude?: [];
            extend?: [];

            [key: string]: any; // for future extensions (status= priority= type=  category= isRead= isArchived, userId=, not_statu=, etc)
        };
        pagination?: {
            page: number;
            perPage: number;
            totalPages: number;
            itemsCount: number;
            totalItems: number;
        };
    } | null;
    timestamp: number;
}

export interface QueryParams {
    search?: string;

    sort?: string;
    order?: "ASC" | "DSC";

    dateFrom?: string;   // YYYY-MM-DD
    dateTo?: string;     // YYYY-MM-DD

    page?: number;
    perPage?: number;

    include?: string; // comma-separated list
    exclude?: string;
    extend?: string;

    // Dynamic custom filters
    [key: string]: any;
}


// Offset-based pagination
export interface PaginationPage {
    page: number;
    perPage: number;
    totalPages: number;
    itemsCount: number;
    totalItems: number;
}

// Limit-offset pagination
export interface PaginationOffset {
    limit: number;
    offset: number;
    totalPages: number;
    itemsCount: number;
    totalItems: number;
}

// Cursor-based pagination
export interface PaginationCursor {
    cursor: string; // usually an opaque ID, can be string or number
    limit: number;
    totalPages: number;
    itemsCount: number;
    totalItems: number;
}

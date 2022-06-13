export type PaginatedResponse<T> = {
    results: Array<T>;
    previous: string;
    next: string;
    count: number;
};
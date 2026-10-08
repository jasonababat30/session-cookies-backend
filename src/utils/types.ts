export interface ErrorExtended extends Error {
    statusCode?: number;
}

export interface User {
    id: number;
    user_name: string;
    password: string;
    role: string;
    first_name: string;
    last_name: string;
    age: number;
}

export interface Search<T>{
    is_or?: boolean;
    filters: Partial<{
        [KeyOfTable in keyof T]: SearchFilterObj;
    }>
}

export interface SearchFilterObj {
    value: string | number | boolean;
    operator: FilterOperator;
}

export type FilterOperator = "eq" | "ne" | "contains" | "not_contains";

// AUTH
export type LoginDTO = {
    user_name: string;
    password: string;
}

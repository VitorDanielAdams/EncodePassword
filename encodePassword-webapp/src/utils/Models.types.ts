export interface IFormLogin {
    login: string;
    password: string;
}

export interface IPassword {
    id?: number;
    password: string;
    description: string;
    url: string;
}

export interface PageRequest {
    filter: string;
    currentPage: number;
    pageSize: number;
    sortField?: string;
    direction: string;
}

export interface PageResponse<T> {
    content: any[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
}

export interface IToken {
    token: string;
    type: string;
}

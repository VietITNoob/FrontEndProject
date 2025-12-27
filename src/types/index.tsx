export interface Product {
    id : number;
    title : string,
    price : number;
    discount : number;
    categoryId: string;
    description : string;
    image? : string;
    thumbnail?: string;
    tech?: string[];
    database?: string[];
    UI_Framework?: string[];
    BackEnd?: string;
    review?: number[];
    rating?: number;
    sold: number;
    createdAt: string;
}

export interface ProductParams {
    title_like?: string;
    categoryId?: string;
    q?: string;
    _sort?: string;
    _order?: 'asc' | 'desc';
}
export interface FilterState {
    search: string;
    category: string;
    tech: string;
}
export interface Category {
    id: number | string;
    name : string;
    image : string;
}

export interface User {
    id: number;
    name: string;
    role: string;
}

export interface Review {
    id: number;
    userId: number;
    productId: number;
    rating: number;
    date: string;
    content: string;
    user?: User;
}

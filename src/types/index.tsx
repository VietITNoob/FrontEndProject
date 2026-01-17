export interface Product {
    id : number;
    title : string,
    price : number;
    discount : number;
    categoryId: string;
    description : string;
    image? : string;
    tech?: string[];
    database?: string[];
    UI_Framework?: string[];
    BackEnd?: string;
    review?: number[];
    rating?: number;
    sold: number;
    createdAt: string;
    marketingBadge?: string;
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

export interface Review {
    id: number;
    userId: number;
    productId: number;
    rating: number;
    date: string;
    content: string;
    user?: User;
}
export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone:string;
    country:string;
    birthday:Date
}

export interface Date{
    month:string;
    day:string;
    year:string;
}
export interface ProductProps {
  data: {
    id: number;
    tag?: string;
    title: string;
    price: string;
    image: string;
    isDark?: boolean;
  };
}
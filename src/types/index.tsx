export interface Product {
    id : number;
    title : string,
    price : number;
    discount : number;
    categoryId: string;
    description : string;
    image? : string; // Changed from image_url and made optional
    thumbnail?: string; // Added thumbnail
    tech?: string[];
    database?: string[];
    "UI Framework"?: string[];
    BackEnd?: string;
    review?: number[]; // Changed to array of numbers
    rating?: number; // Added rating
    sold: number;
    createdAt: string;
}

export interface Category {
    id: number | string;
    name : string;
    image : string;
}

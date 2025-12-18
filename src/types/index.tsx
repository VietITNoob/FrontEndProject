export interface product {
    id : number;
    name : string,
    price : number;
    image : string;
    description : string;
    image_url : string;
}

export interface Category {
    id: number | string;
    name : string;
    image : string;
}
export interface ProductDto {
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
}

export interface ProductWithId extends ProductDto {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
}
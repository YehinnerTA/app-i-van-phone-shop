export interface Product {
    id: string;
    name: string;
    category: 'celulares' | 'accesorios' | 'casos' | 'audifonos';
    price: number;
    stock: number;
    description: string;
    createdAt: Date;
}
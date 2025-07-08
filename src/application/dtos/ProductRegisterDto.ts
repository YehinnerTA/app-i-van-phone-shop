export interface ProductRegisterDto {
    name: string;
    category: 'celulares' | 'accesorios' | 'casos' | 'audifonos';
    price: number;
    stock: number;
    description: string;
    dateAdded: string;
}
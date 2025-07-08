import { ProductRegisterDto } from '../../application/dtos/ProductRegisterDto';

export interface ProductWithId extends ProductRegisterDto {
    id: string;
}

export interface IProductRepository {
    createProduct(product: ProductRegisterDto): Promise<string>;
    getProducts(): Promise<ProductWithId[]>;
    updateProduct(id: string, product: ProductRegisterDto): Promise<void>;
    deleteProduct(id: string): Promise<void>;
}
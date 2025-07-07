import { ProductDto } from '../../application/dtos/ProductDto';

export type ProductWithId = ProductDto & { id: string };

export interface IProductRepository {
    createProduct(product: ProductDto): Promise<string>;
    getProducts(): Promise<ProductWithId[]>;
    updateProduct(productId: string, product: ProductDto): Promise<void>;
    deleteProduct(productId: string): Promise<void>;
}
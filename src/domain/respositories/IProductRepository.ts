import { Product } from '../entities/Product';

export interface IProductRepository {
    addProduct(product: Product): Promise<void>;
    getAllProducts(): Promise<Product[]>;
    deleteProduct(id: string): Promise<void>;
    updateProduct(product: Product): Promise<void>;
    // Otros métodos futuros: updateProduct, getProductById, etc.
}
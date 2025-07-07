import { ProductDto } from "../../application/dtos/ProductDto";

export interface IProductRepository {
    addProduct(dto: ProductDto): Promise<void>;
    getAllProducts(): Promise<ProductDto[]>;
    deleteProduct(id: string): Promise<void>;
    updateProduct(id: string, dto: ProductDto): Promise<void>;
}
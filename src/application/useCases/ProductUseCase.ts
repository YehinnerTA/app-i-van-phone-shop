import { ProductDto } from '../dtos/ProductDto';
import { IProductRepository } from '../../domain/respositories/IProductRepository';

export class AddProductUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute(dto: ProductDto): Promise<void> {
        await this.productRepo.addProduct(dto);
    }
}

export class GetProductsUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute(): Promise<ProductDto[]> {
        return await this.productRepo.getAllProducts();
    }
}

export class DeleteProductUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute(productId: string): Promise<void> {
        await this.productRepo.deleteProduct(productId);
    }
}

export class UpdateProductUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute(productId: string, dto: ProductDto): Promise<void> {
        await this.productRepo.updateProduct(productId, dto);
    }
}
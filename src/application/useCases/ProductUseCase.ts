import { ProductRegisterDto } from '../dtos/ProductRegisterDto';
import { IProductRepository, ProductWithId } from '../../domain/respositories/IProductRepository';

export class AddProductUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute(product: ProductRegisterDto): Promise<string> {
        return await this.productRepo.createProduct(product);
    }
}

export class GetProductsUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute(): Promise<ProductWithId[]> {
        return await this.productRepo.getProducts();
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

    async execute(productId: string, product: ProductRegisterDto): Promise<void> {
        await this.productRepo.updateProduct(productId, product);
    }
}
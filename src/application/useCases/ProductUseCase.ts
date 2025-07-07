import { ProductDto } from '../dtos/ProductDto';
import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/respositories/IProductRepository';

export class AddProductUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute(dto: ProductDto): Promise<void> {
        const newProduct: Product = {
            id: this.generateId(),
            ...dto,
            dateAdded: new Date()
        };

        await this.productRepo.addProduct(newProduct);
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 12);
    }
}

export class GetProductsUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute(): Promise<Product[]> {
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
        const updatedProduct: Product = {
            id: productId,
            ...dto,
            dateAdded: new Date() // Puedes ajustar si prefieres conservar el `dateAdded` original
        };

        await this.productRepo.updateProduct(updatedProduct);
    }
}
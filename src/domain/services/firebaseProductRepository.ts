import { ProductDto } from '../../application/dtos/ProductDto';
import { IProductRepository } from '../respositories/IProductRepository';
import { app_DB } from './firebaseConfig';
import { collection, addDoc, deleteDoc, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export class FirebaseProductRepository implements IProductRepository {
    private readonly collectionName = 'products';

    async createProduct(product: ProductDto): Promise<string> {
        const docRef = await addDoc(collection(app_DB, this.collectionName), {
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            description: product.description,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    }

    async getProducts(): Promise<(ProductDto & { id: string })[]> {
        const snapshot = await getDocs(collection(app_DB, this.collectionName));
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                category: data.category,
                price: data.price,
                stock: data.stock,
                description: data.description,
                createdAt: data.createdAt?.toDate(),
                updatedAt: data.updatedAt?.toDate(),
            };
        });
    }

    async deleteProduct(id: string): Promise<void> {
        await deleteDoc(doc(app_DB, this.collectionName, id));
    }

    async updateProduct(id: string, product: ProductDto): Promise<void> {
        await updateDoc(doc(app_DB, this.collectionName, id), {
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            description: product.description,
            updatedAt: serverTimestamp()
        });
    }
}
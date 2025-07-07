import { Product } from '../entities/Product';
import { IProductRepository } from '../respositories/IProductRepository';
import { app_DB } from './firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export class FirebaseProductRepository implements IProductRepository {
    private productsCollection = collection(app_DB, 'products');

    async addProduct(product: Product): Promise<void> {
        await addDoc(this.productsCollection, {
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            description: product.description,
            img: product.img,
            dateAdded: product.dateAdded
        });
    }

    async getAllProducts(): Promise<Product[]> {
        const snapshot = await getDocs(this.productsCollection);
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                dateAdded: data.dateAdded?.toDate?.() || new Date()
            } as Product;
        });
    }

    async deleteProduct(id: string): Promise<void> {
        await deleteDoc(doc(this.productsCollection, id));
    }

    async updateProduct(product: Product): Promise<void> {
        const productRef = doc(this.productsCollection, product.id);

        await updateDoc(productRef, {
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            description: product.description,
            img: product.img,
            dateAdded: product.dateAdded
        });
    }
}
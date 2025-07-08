import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { app_DB } from './firebaseConfig';
import { ProductRegisterDto } from '../../application/dtos/ProductRegisterDto';
import { IProductRepository, ProductWithId } from '../respositories/IProductRepository';

export class FirebaseProductRepository implements IProductRepository {
    private collectionRef = collection(app_DB, 'products');

    async createProduct(product: ProductRegisterDto): Promise<string> {
        const docRef = await addDoc(this.collectionRef, product);
        return docRef.id;
    }

    async getProducts(): Promise<ProductWithId[]> {
        const querySnapshot = await getDocs(this.collectionRef);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as ProductWithId[];
    }

    async updateProduct(id: string, product: ProductRegisterDto): Promise<void> {
        const docRef = doc(this.collectionRef, id);
        const filteredProduct = Object.fromEntries(
            Object.entries(product).filter(([, v]) => v !== undefined)
        );
        await updateDoc(docRef, filteredProduct);
    }

    async deleteProduct(id: string): Promise<void> {
        const docRef = doc(this.collectionRef, id);
        await deleteDoc(docRef);
    }
}
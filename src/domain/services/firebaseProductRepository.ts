import { ProductDto } from '../../application/dtos/ProductDto';
import { IProductRepository } from '../respositories/IProductRepository'; import { app_DB, app_Storage } from './firebaseConfig';
import { collection, addDoc, deleteDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export class FirebaseProductRepository implements IProductRepository {
    private productsCollection = collection(app_DB, 'products');

    async getAllProducts(): Promise<ProductDto[]> {
        const snapshot = await getDocs(this.productsCollection);
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                name: data.name,
                category: data.category,
                price: data.price,
                stock: data.stock,
                description: data.description,
                img: data.img,
                dateAdded: data.dateAdded?.toDate?.() ?? new Date()
            } as ProductDto;
        });
    }

    async addProduct(dto: ProductDto): Promise<void> {
        let imageUrl = '';

        if (dto.imgFile) {
            const storageRef = ref(app_Storage, `products/${Date.now()}_${dto.imgFile.name}`);
            const snapshot = await uploadBytes(storageRef, dto.imgFile);
            imageUrl = await getDownloadURL(snapshot.ref);
        }

        await addDoc(this.productsCollection, {
            name: dto.name,
            category: dto.category,
            price: dto.price,
            stock: dto.stock,
            description: dto.description,
            img: imageUrl,
            dateAdded: new Date()
        });
    }

    async deleteProduct(id: string): Promise<void> {
        await deleteDoc(doc(this.productsCollection, id));
    }

    async updateProduct(id: string, dto: ProductDto): Promise<void> {
        const productRef = doc(this.productsCollection, id);
        await updateDoc(productRef, {
            ...dto,
            dateAdded: new Date()
        });
    }
}
import { app_DB } from "../../domain/services/firebaseConfig";
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { ProductRegisterDto } from "../dtos/ProductRegisterDto";

export const registerProductUseCase = async (product: ProductRegisterDto): Promise<void> => {
    const producWithTimestamp = {
        ...product,
        createdAt: serverTimestamp()
    };
    await addDoc(collection(app_DB, "products"), producWithTimestamp);
};

export const updateProductUseCase = async (productId: string, updatedFields: Partial<ProductRegisterDto>): Promise<void> => {
    const productRef = doc(app_DB, "products", productId);
    await updateDoc(productRef, updatedFields);
};
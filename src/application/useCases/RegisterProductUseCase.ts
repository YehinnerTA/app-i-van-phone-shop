import { app_DB } from "../../domain/services/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ProductRegisterDto } from "../dtos/ProductRegisterDto";

export const registerProductUseCase = async (product: ProductRegisterDto): Promise<void> => {
    const producWithTimestamp = {
        ...product,
        createdAt: serverTimestamp()
    };
    await addDoc(collection(app_DB, "products"), producWithTimestamp);
};
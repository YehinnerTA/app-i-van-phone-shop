import { OrderRegisterDto } from "../dtos/OrderRegisterDto";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { app_DB } from "../../domain/services/firebaseConfig";

export const registerOrderUseCase = async (orderData: OrderRegisterDto): Promise<string> => {
    const orderWithMeta = {
        ...orderData,
        createdAt: Timestamp.now().toDate().toISOString(),
    };

    const docRef = await addDoc(collection(app_DB, 'orders'), orderWithMeta);
    return docRef.id;
}
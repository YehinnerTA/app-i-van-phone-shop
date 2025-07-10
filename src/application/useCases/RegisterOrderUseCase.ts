import { OrderRegisterDto } from "../dtos/OrderRegisterDto";
import { collection, addDoc } from "firebase/firestore";
import { app_DB } from "../../domain/services/firebaseConfig";

export const registerOrderUseCase = async (orderData: OrderRegisterDto): Promise<string> => {
    try {
        const ordersCollection = collection(app_DB, 'orders');
        const docRef = await addDoc(ordersCollection, {
            ...orderData,
            createdAt: new Date().toISOString(),
            status: 'En Espera',
        });
        return docRef.id;
    } catch (error) {
        console.error('Error al registrar el pedido en Firestore:', error);
        throw error;
    }
};
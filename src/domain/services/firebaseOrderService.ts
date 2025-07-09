import { collection, getDocs } from "firebase/firestore";
import { Order } from "../entities/Order";
import { app_DB } from "./firebaseConfig";

export const fetchOrders = async (): Promise<Order[]> => {
    const snapshot = await getDocs(collection(app_DB, "orders"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Order[];
};
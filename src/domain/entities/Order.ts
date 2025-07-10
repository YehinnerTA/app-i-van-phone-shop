export interface Order {
    id: string;
    userId: string;
    userEmail: string;
    products: {
        productId: string;
        name: string;
        image?: string;
        category: string;
        memory?: string;
        quantity: number;
        price: number;
        totalPrice: number;
    }[];
    subtotal: number;
    discount: number;
    total: number;
    paymentMethod: "credit-card" | "yape" | "efectivo";
    paymentDetails: {
        cardNumber?: string;
        expiration?: string;
        cvv?: string;
        phone?: string;
        fullName?: string;
    };
    createdAt: string;
    status?: "En Espera" | "procesado" | "completo" | "cancelado";
    paymentStatus?: "pendiente" | "pagado" | "reembolsado";
}
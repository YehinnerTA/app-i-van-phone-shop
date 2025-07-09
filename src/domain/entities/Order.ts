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
    paymentMethod: 'credit-card' | 'yape' | 'cash';
    paymentDetails: {
        cardNumber?: string;
        expiration?: string;
        cvv?: string;
        phone?: string;
        fullName?: string;
    };
    createdAt: string;
    status?: 'pending' | 'processing' | 'completed' | 'cancelled';
    paymentStatus?: 'pendiente' | 'pagado' | 'reembolsado';
}
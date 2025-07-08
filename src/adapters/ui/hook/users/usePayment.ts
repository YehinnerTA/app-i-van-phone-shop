import { useEffect, useState, useMemo } from 'react';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { app_DB } from '../../../../domain/services/firebaseConfig';
import { ProductRegisterDto } from '../../../../application/dtos/ProductRegisterDto';

interface ProductWithId extends ProductRegisterDto {
    id: string;
    quantity: number;
}

export const usePayment = () => {
    const [products, setProducts] = useState<ProductWithId[]>([]);
    const [currentDiscount, setCurrentDiscount] = useState(0);

    const fetchBuyProducts = async () => {
        const q = query(collection(app_DB, 'products'), where('buy', '==', true));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(docSnap => {
            const data = docSnap.data() as ProductRegisterDto;
            return {
                id: docSnap.id,
                quantity: data.quantity ?? 1,
                ...data,
            };
        });
        setProducts(items);
    };

    useEffect(() => {
        fetchBuyProducts();
    }, []);

    const updateQuantityInDB = async (id: string, quantity: number) => {
        await updateDoc(doc(app_DB, 'products', id), { quantity });
        await fetchBuyProducts();
    };

    const increaseQuantity = async (id: string) => {
        const product = products.find(p => p.id === id);
        if (!product) return;
        await updateQuantityInDB(id, product.quantity + 1);
    };

    const decreaseQuantity = async (id: string) => {
        const product = products.find(p => p.id === id);
        if (!product || product.quantity <= 1) return;
        await updateQuantityInDB(id, product.quantity - 1);
    };

    const removeItem = async (id: string) => {
        await updateDoc(doc(app_DB, 'products', id), { buy: false });
        await fetchBuyProducts();
    };

    const priceData = useMemo(() => {
        const subtotal = products.reduce((sum, p) => sum + (p.price || 0) * (p.quantity || 1), 0);
        const discountAmount = subtotal * currentDiscount;
        const total = subtotal - discountAmount;

        return {
            productCount: `${products.length} producto${products.length !== 1 ? 's' : ''}`,
            subtotal: `S/.${subtotal.toLocaleString()}`,
            discount: `S/.${discountAmount.toLocaleString()}`,
            total: `S/.${total.toFixed(2)}`,
            quantityDisplay: products.reduce((sum, p) => sum + (p.quantity || 1), 0),
            itemPrice: `S/.${subtotal.toLocaleString()}`,
        };
    }, [products, currentDiscount]);

    const applyDiscount = () => {
        const input = document.querySelector('.text-card-discount') as HTMLInputElement;
        const code = input?.value.trim().toLowerCase();

        const discounts: Record<string, number> = {
            'descuento10': 0.10,
            'descuento20': 0.20,
            'blackfriday': 0.30,
            'black friday': 0.30,
        };

        if (discounts[code]) {
            setCurrentDiscount(discounts[code]);
            alert(`¡Descuento aplicado! ${discounts[code] * 100}% de descuento`);
        } else {
            alert('Código de descuento no válido');
        }
    };

    return {
        products,
        priceData,
        applyDiscount,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        refetch: fetchBuyProducts,
    };
};
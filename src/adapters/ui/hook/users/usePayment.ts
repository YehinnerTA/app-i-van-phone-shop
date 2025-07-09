import { useEffect, useState, useMemo } from 'react';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { app_DB } from '../../../../domain/services/firebaseConfig';
import { ProductRegisterDto } from '../../../../application/dtos/ProductRegisterDto';
import { registerOrderUseCase } from '../../../../application/useCases/RegisterOrderUseCase';
import { OrderRegisterDto } from '../../../../application/dtos/OrderRegisterDto';
import { User } from '../../../../domain/entities/User';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserProfile } from '../../../../domain/services/firebaseUserService';

interface ProductWithId extends ProductRegisterDto {
    id: string;
    quantity: number;
}

type PaymentMethod = 'credit-card' | 'yape' | 'cash' | '';

export const usePayment = () => {
    function removeUndefined<T>(obj: T): T {
        if (Array.isArray(obj)) {
            return obj.map(item => removeUndefined(item)) as T;
        } else if (typeof obj === 'object' && obj !== null) {
            return Object.fromEntries(
                Object.entries(obj)
                    .filter(([, value]) => value !== undefined)
                    .map(([key, value]) => [key, removeUndefined(value)])
            ) as T;
        }
        return obj;
    }

    const [userData, setUserData] = useState<Partial<User> | null>(null);
    const [products, setProducts] = useState<ProductWithId[]>([]);
    const [currentDiscount, setCurrentDiscount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('');
    const [paymentFields, setPaymentFields] = useState<Record<string, string>>({});
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const profile = await getUserProfile(user.uid);
                const lastAccess = user.metadata.lastSignInTime || '';

                if (profile) {
                    setUserData({
                        ...profile,
                        uid: user.uid,
                        lastAccess
                    });
                }
            }
        });

        return () => unsubscribe();
    }, []);

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
            subtotalFormatted: `S/.${subtotal.toLocaleString()}`,
            discountFormatted: `S/.${discountAmount.toLocaleString()}`,
            totalFormatted: `S/.${total.toFixed(2)}`,
            subtotal,
            discount: discountAmount,
            total,
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

    const handlePaymentMethodChange = (method: PaymentMethod) => {
        setPaymentMethod(method);
        setPaymentFields({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentFields(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckoutLogin = async () => {
        if (!userData || !userData.uid || !userData.email) {
            alert('Debes iniciar sesión para finalizar la compra.');
            return;
        }
        console.log('👉 handleCheckoutLogin ejecutado');
        if (!paymentMethod) {
            alert('Por favor, selecciona un método de pago.');
            return;
        }

        if (paymentMethod === 'credit-card') {
            const { cardNumber, expiration, cvv } = paymentFields;
            if (!cardNumber || !expiration || !cvv) {
                alert('Por favor, completa todos los campos de la tarjeta.');
                return;
            }
        }

        if (paymentMethod === 'yape') {
            const { phone } = paymentFields;
            if (!phone) {
                alert('Por favor, ingresa tu número de Yape.');
                return;
            }
        }

        if (paymentMethod === 'cash') {
            const { fullName } = paymentFields;
            if (!fullName || fullName.trim() !== 'CompraEfectivo') {
                alert('Para pago en efectivo, debes ingresar el código exacto brindado por el vendedor');
                return;
            }
            alert('✅ Pago en efectivo validado');
        }

        const orderData: OrderRegisterDto = {
            userId: userData.uid,
            userEmail: userData.email || '',
            products: products.map(p => ({
                productId: p.id,
                name: p.name,
                image: p.image,
                category: p.category,
                memory: p.memory,
                quantity: p.quantity,
                price: p.price,
                totalPrice: p.price * p.quantity,
            })),
            subtotal: priceData.subtotal,
            discount: priceData.discount,
            total: priceData.total,
            paymentMethod,
            paymentDetails: {
                ...(paymentMethod === 'credit-card' && {
                    cardNumber: paymentFields.cardNumber,
                    expiration: paymentFields.expiration,
                    cvv: paymentFields.cvv,
                }),
                ...(paymentMethod === 'yape' && {
                    phone: paymentFields.phone,
                }),
                ...(paymentMethod === 'cash' && {
                    fullName: paymentFields.fullName,
                }),
            },
        };

        setIsProcessing(true);
        try {
            const cleanedOrderData = removeUndefined(orderData);
            const orderId = await registerOrderUseCase(cleanedOrderData);
            console.log(`Pedido registrado con ID: ${orderId}`);
            for (const product of products) {
                await updateDoc(doc(app_DB, 'products', product.id), { buy: false });
            }
            setProducts([]);
            setPaymentMethod('');
            setPaymentFields({});
            setCurrentDiscount(0);
            alert('✅ Tu pedido ha sido registrado con éxito');
        } catch (error) {
            console.error('Error al registrar el pedido:', error);
        } finally {
            setIsProcessing(false);
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
        paymentMethod,
        setPaymentMethod: handlePaymentMethodChange,
        paymentFields,
        handleInputChange,
        handleCheckoutLogin,
        isProcessing,
        userData,
    };
};
import { useState } from 'react';

export const usePayment = () => {
    const [quantity, setQuantity] = useState(1);
    const basePrice = 1299;
    const [currentDiscount, setCurrentDiscount] = useState(0);

    const updatePrice = () => {
        const itemPrice = basePrice * quantity;
        const discountAmount = itemPrice * currentDiscount;
        const finalPrice = itemPrice - discountAmount;

        return {
            quantityDisplay: quantity,
            itemPrice: `S/.${itemPrice.toLocaleString()}`,
            subtotal: `S/.${itemPrice.toLocaleString()}`,
            discount: `S/.${discountAmount.toLocaleString()}`,
            total: `S/.${finalPrice.toLocaleString()}`,
            productCount: `${quantity} producto${quantity !== 1 ? 's' : ''}`
        };
    };

    const priceData = updatePrice();

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const removeItem = () => {
        setQuantity(0);
    };

    const applyDiscount = () => {
        const discountInput = document.querySelector('.text-card-discount') as HTMLInputElement;
        const discountCode = discountInput.value.trim().toLowerCase();
        let discountApplied = false;
        let newDiscount = 0;

        switch (discountCode) {
            case 'descuento10':
                newDiscount = 0.10;
                discountApplied = true;
                break;
            case 'descuento20':
                newDiscount = 0.20;
                discountApplied = true;
                break;
            case 'black friday':
            case 'blackfriday':
                newDiscount = 0.30;
                discountApplied = true;
                break;
            default:
                newDiscount = 0;
                alert('Código de descuento no válido');
        }

        if (discountApplied) {
            setCurrentDiscount(newDiscount);
            alert(`¡Descuento aplicado! ${(newDiscount * 100)}% de descuento`);
        }
    };

    return {
        quantity,
        basePrice,
        currentDiscount,
        priceData,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        applyDiscount,
        setQuantity,
        setCurrentDiscount,
        updatePrice,
    };
};
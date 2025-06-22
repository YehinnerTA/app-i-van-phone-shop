import { useState, useCallback } from 'react';

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    }, []);

    const handleProductClick = useCallback(() => {
        openModal();
    }, [openModal]);

    const handleBuyClick = useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
        alert('Funcionalidad de compra - Aquí iría la lógica de compra');
    }, []);

    const handleModalOverlayClick = useCallback((event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }, [closeModal]);

    const handleModalContentClick = useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
    }, []);

    const handleCloseClick = useCallback(() => {
        closeModal();
    }, [closeModal]);

    const handlePrimaryButtonClick = useCallback(() => {
        alert('¡Producto añadido al carrito!');
        closeModal();
    }, [closeModal]);

    const handleSecondaryButtonClick = useCallback(() => {
        alert('¡Producto añadido a favoritos!');
    }, []);

    return {
        isModalOpen,
        handleProductClick,
        handleBuyClick,
        handleModalOverlayClick,
        handleModalContentClick,
        handleCloseClick,
        handlePrimaryButtonClick,
        handleSecondaryButtonClick,
    };
};
import { useState, useEffect } from 'react';

export const useCatalogProduct = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState('Celulares');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % 3);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
    };

    // Controles Tarjeta Flotante
    function openModal() {
        const modal = document.getElementById('productModal') as HTMLElement;
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(event?: MouseEvent | React.MouseEvent) {
        if (event && event.target !== event.currentTarget && !(event.target as HTMLElement).classList.contains('modal-close')) {
            return;
        }

        const modal = document.getElementById('productModal') as HTMLElement;
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    useEffect(() => {
        const primaryButton = document.querySelector('.modal-button.primary') as HTMLButtonElement;
        const secondaryButton = document.querySelector('.modal-button.secondary') as HTMLButtonElement;

        const handlePrimaryClick = () => {
            alert('¡Producto añadido al carrito!');
            closeModal();
        };

        const handleSecondaryClick = () => {
            alert('¡Producto añadido a favoritos!');
        };

        if (primaryButton) {
            primaryButton.addEventListener('click', handlePrimaryClick);
        }

        if (secondaryButton) {
            secondaryButton.addEventListener('click', handleSecondaryClick);
        }

        return () => {
            if (primaryButton) {
                primaryButton.removeEventListener('click', handlePrimaryClick);
            }
            if (secondaryButton) {
                secondaryButton.removeEventListener('click', handleSecondaryClick);
            }
        };
    }, []);

    const handleProductClick = () => {
        openModal();
    };

    const handleBuyClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        alert('Funcionalidad de compra - Aquí iría la lógica de compra');
    };

    const handleModalOverlayClick = (event: React.MouseEvent) => {
        closeModal(event);
    };

    const handleModalContentClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handleCloseClick = () => {
        closeModal();
    };

    return {
        currentIndex,
        activeCategory,
        handleCategoryClick,
        handleProductClick,
        handleBuyClick,
        handleModalOverlayClick,
        handleModalContentClick,
        handleCloseClick,
    };
};
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

    const handleBuyClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        alert('Funcionalidad de compra - Aquí iría la lógica de compra');
    };

    return {
        currentIndex,
        activeCategory,
        handleCategoryClick,
        handleBuyClick
    };
};
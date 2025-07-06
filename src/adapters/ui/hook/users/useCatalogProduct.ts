import { useState, useEffect } from 'react';

type Product = {
    title: string;
    price: string;
    img: string;
}

export const useCatalogProduct = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState<'Celulares' | 'Accesorios' | 'Otros'>('Celulares');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermFeatured, setSearchTermFeatured] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % 3);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleCategoryClick = (category: typeof activeCategory) => {
        setActiveCategory(category);
        setSearchTerm('');
    };

    const handleBuyClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        alert('Funcionalidad de compra - Aquí iría la lógica de compra');
    };

    const products: Record<typeof activeCategory, Product[]> = {
        Celulares: [
            { title: "Smartphone X", price: "$499.99", img: "/src/assets/images/apple-iphone13.png" },
            { title: "Smartphone Y", price: "$599.99", img: "/src/assets/images/apple-iphone13.png" },
            { title: "Headphones Z", price: "$199.99", img: "/src/assets/images/apple-iphone13.png" },
        ],
        Accesorios: [
            { title: "Audifonos", price: "$249.99", img: "/src/assets/images/audifonos.jpeg" },
            { title: "Cargador", price: "$29.99", img: "/src/assets/images/audifonos.jpeg" },
            { title: "Cable", price: "$19.99", img: "/src/assets/images/audifonos.jpeg" },
        ],
        Otros: [
            { title: "Carca celular", price: "$299.99", img: "/src/assets/images/funda.jpeg" },
            { title: "Mica", price: "$399.99", img: "/src/assets/images/funda.jpeg" },
            { title: "Splash", price: "$149.99", img: "/src/assets/images/funda.jpeg" },
        ],
    };

    const featuredProducts: Product[] = [
        { title: "iPhone 13", price: "$799", img: "/src/assets/images/apple-iphone13.png" },
        { title: "iPhone 14", price: "$899", img: "/src/assets/images/apple-iphone13.png" },
        { title: "iPhone 15", price: "$999", img: "/src/assets/images/apple-iphone13.png" },
    ];

    const filteredProducts = products[activeCategory].filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredFeaturedProducts = featuredProducts.filter(product =>
        product.title.toLowerCase().includes(searchTermFeatured.toLowerCase())
    );

    return {
        // Generales
        currentIndex,
        activeCategory,
        handleCategoryClick,
        handleBuyClick,

        // Productos normales
        searchTerm,
        setSearchTerm,
        filteredProducts,

        // Productos destacados
        searchTermFeatured,
        setSearchTermFeatured,
        filteredFeaturedProducts
    };
};
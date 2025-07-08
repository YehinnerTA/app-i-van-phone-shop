import { useState, useEffect } from 'react';
import { ProductRegisterDto } from '../../../../application/dtos/ProductRegisterDto';
import { app_DB } from '../../../../domain/services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { updateProductUseCase } from '../../../../application/useCases/RegisterProductUseCase';

export interface ProductWithId extends ProductRegisterDto {
    id: string;
}

export const useCatalogProduct = () => {
    const [products, setProducts] = useState<ProductWithId[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState<'Celulares' | 'Accesorios' | 'Otros'>('Celulares');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermFeatured, setSearchTermFeatured] = useState('');

    const fetchProducts = async () => {
        const snapshot = await getDocs(collection(app_DB, 'products'));
        const fetchedProducts: ProductWithId[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as ProductRegisterDto),
        }));
        setProducts(fetchedProducts);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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

    const handleBuyClick = async (event: React.MouseEvent, product: ProductWithId) => {
        event.stopPropagation();

        try {
            const updatedBuy = !product.buy;

            await updateProductUseCase(product.id, { buy: updatedBuy });
            await fetchProducts();

            alert(updatedBuy ? '¡Producto añadido al carrito!' : 'Producto quitado del carrito');
        } catch (error) {
            console.error('Error al actualizar el carrito:', error);
            alert('Ocurrió un error al actualizar el estado del carrito.');
        }
    };


    const filteredProducts = products
        .filter(p => p.category.toLowerCase() === activeCategory.toLowerCase())
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));


    const filteredFeaturedProducts = products
        .filter(product => product.featured)
        .filter(product =>
            product.name.toLowerCase().includes(searchTermFeatured.toLowerCase())
        );

    return {
        currentIndex,
        activeCategory,
        handleCategoryClick,
        handleBuyClick,
        searchTerm,
        setSearchTerm,
        filteredProducts,
        searchTermFeatured,
        setSearchTermFeatured,
        filteredFeaturedProducts,
        fetchProducts,
    };
};
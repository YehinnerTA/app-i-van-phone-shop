import { useEffect, useState } from 'react';
import { collection, doc, getDocs, updateDoc, addDoc } from 'firebase/firestore';
import { app_DB, app_auth } from '../../../../domain/services/firebaseConfig';
import { ProductRegisterDto } from '../../../../application/dtos/ProductRegisterDto';
import { StockChangeDto } from '../../../../application/dtos/StockChangeDto';

export const useDashboardInventory = () => {
    const [products, setProducts] = useState<(ProductRegisterDto & { id: string })[]>([]);

    // Estado para los filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Todas las categorías');
    const [stockStatusFilter, setStockStatusFilter] = useState('Todos los estados');

    // Estado para el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<(ProductRegisterDto & { id: string }) | null>(null);
    const [newStock, setNewStock] = useState(0);
    const [changeReason, setChangeReason] = useState('Reposición de inventario');
    const [comments, setComments] = useState('');

    const isValidImageUrl = (url: string): boolean => {
        return /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
    };

    // Estadísticas calculadas
    const activeProducts = products.length;
    const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const outOfStockProducts = products.filter(p => p.stock === 0).length;
    const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);

    useEffect(() => {
        const fetchProducts = async () => {
            const snapshot = await getDocs(collection(app_DB, 'products'));
            const fetchedProducts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as (ProductRegisterDto & { id: string })[];
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);

    // Filtrar productos
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            categoryFilter === 'Todas las categorías' || product.category === categoryFilter;

        let matchesStockStatus = true;
        if (stockStatusFilter === 'Stock alto') {
            matchesStockStatus = product.stock > 10;
        } else if (stockStatusFilter === 'Stock medio') {
            matchesStockStatus = product.stock > 5 && product.stock <= 10;
        } else if (stockStatusFilter === 'Stock bajo') {
            matchesStockStatus = product.stock > 0 && product.stock <= 5;
        } else if (stockStatusFilter === 'Agotado') {
            matchesStockStatus = product.stock === 0;
        }

        return matchesSearch && matchesCategory && matchesStockStatus;
    });

    // Abrir modal para actualizar stock
    const handleOpenModal = (product: ProductRegisterDto & { id: string }) => {
        setCurrentProduct(product);
        setNewStock(product.stock);
        setIsModalOpen(true);
    };

    // Cerrar modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
        setNewStock(0);
        setChangeReason('Reposición de inventario');
        setComments('');
    };

    // Actualizar stock
    const handleUpdateStock = async () => {
        if (!currentProduct || newStock < 0) {
            alert('Por favor ingresa una cantidad válida');
            return;
        }

        try {
            const productRef = doc(app_DB, 'products', currentProduct.id);

            // 1. Actualizar el stock
            await updateDoc(productRef, {
                stock: newStock
            });

            // 2. Crear historial de cambio
            const stockHistoryRef = collection(productRef, 'stockHistory');
            const changeDto: StockChangeDto = {
                oldStock: currentProduct.stock,
                newStock: newStock,
                reason: changeReason,
                comments: comments.trim() || undefined,
                changedAt: new Date(),
                changedBy: app_auth.currentUser?.uid || 'admin'
            };

            await addDoc(stockHistoryRef, changeDto);

            // 3. Refrescar localmente el producto
            setProducts(prev =>
                prev.map(p =>
                    p.id === currentProduct.id ? { ...p, stock: newStock } : p
                )
            );

            console.log(`✅ Stock actualizado para ${currentProduct.name}`);
        } catch (error) {
            console.error('❌ Error al actualizar stock:', error);
            alert('Error al actualizar el stock.');
        }

        handleCloseModal();
    };

    // Manejar cambio en el input de búsqueda
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Manejar cambio en el filtro de categoría
    const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryFilter(e.target.value);
    };

    // Manejar cambio en el filtro de estado de stock
    const handleStockStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStockStatusFilter(e.target.value);
    };

    // Obtener la clase CSS para el badge de stock
    const getStockBadgeClass = (stock: number) => {
        if (stock === 0) return 'dashboard-inventory-stock-out';
        if (stock <= 5) return 'dashboard-inventory-stock-low';
        if (stock <= 10) return 'dashboard-inventory-stock-medium';
        return 'dashboard-inventory-stock-high';
    };

    const getProductIcon = (category: string) => {
        switch (category) {
            case 'celulares': return '📱';
            case 'audifonos': return '🎧';
            case 'accesorios': return '🛍️';
            case 'casos': return '📦';
            default: return '🛍️';
        }
    };

    return {
        products,
        searchTerm,
        categoryFilter,
        stockStatusFilter,
        isModalOpen,
        currentProduct,
        newStock,
        changeReason,
        comments,
        activeProducts,
        lowStockProducts,
        outOfStockProducts,
        totalValue,
        filteredProducts,
        setNewStock,
        setChangeReason,
        setComments,
        handleOpenModal,
        handleCloseModal,
        handleUpdateStock,
        handleSearchChange,
        handleCategoryFilterChange,
        handleStockStatusFilterChange,
        getStockBadgeClass,
        isValidImageUrl,
        getProductIcon,
    };
};
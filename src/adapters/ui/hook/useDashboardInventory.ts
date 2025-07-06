import { useState } from 'react';

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    sku: string;
    status: 'online' | 'offline';
    image: string;
}

export const useDashboardInventory = () => {
    // Estado para los productos
    const [products, setProducts] = useState<Product[]>([
        {
            id: '1',
            name: 'iPhone 15 Pro Max',
            category: 'Smartphones',
            price: 1299.00,
            stock: 25,
            sku: 'IP15PM',
            status: 'online',
            image: '📱'
        },
        {
            id: '2',
            name: 'Samsung Galaxy S24',
            category: 'Smartphones',
            price: 899.00,
            stock: 8,
            sku: 'SGS24',
            status: 'online',
            image: '📱'
        },
        {
            id: '3',
            name: 'AirPods Pro 2',
            category: 'Audífonos',
            price: 249.00,
            stock: 18,
            sku: 'APP2',
            status: 'online',
            image: '🎧'
        },
        {
            id: '4',
            name: 'Cargador USB-C 20W',
            category: 'Cargadores',
            price: 29.00,
            stock: 0,
            sku: 'CU20W',
            status: 'offline',
            image: '🔌'
        },
        {
            id: '5',
            name: 'Funda iPhone 15',
            category: 'Fundas',
            price: 39.00,
            stock: 3,
            sku: 'FI15',
            status: 'online',
            image: '🛡️'
        }
    ]);

    // Estado para los filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Todas las categorías');
    const [stockStatusFilter, setStockStatusFilter] = useState('Todos los estados');

    // Estado para el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [newStock, setNewStock] = useState(0);
    const [changeReason, setChangeReason] = useState('Reposición de inventario');
    const [comments, setComments] = useState('');

    // Estadísticas calculadas
    const activeProducts = products.length;
    const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const outOfStockProducts = products.filter(p => p.stock === 0).length;
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);

    // Filtrar productos
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'Todas las categorías' ||
            product.category === categoryFilter;

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
    const handleOpenModal = (product: Product) => {
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
    const handleUpdateStock = () => {
        if (!currentProduct || newStock < 0) {
            alert('Por favor ingresa una cantidad válida');
            return;
        }

        setProducts(products.map(product =>
            product.id === currentProduct.id ? { ...product, stock: Number(newStock) } : product
        ));

        console.log(`Stock actualizado para ${currentProduct.name}: ${newStock} unidades`);
        console.log('Motivo:', changeReason);
        console.log('Comentarios:', comments);

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
        getStockBadgeClass
    };
};
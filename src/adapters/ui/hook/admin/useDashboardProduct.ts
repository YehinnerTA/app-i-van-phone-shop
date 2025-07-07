import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
    dateAdded: string;
}

const useDashboardProduct = () => {
    // Estados para los modales
    const [modalState, setModalState] = useState({
        add: false,
        details: false,
        delete: false
    });
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    // Datos de ejemplo de productos
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: 'iPhone 15 Pro Max',
            category: 'celulares',
            price: 1299.99,
            stock: 25,
            description: 'iPhone 15 Pro Max con pantalla de 6.7 pulgadas, cámara triple de 48MP, chip A17 Pro y diseño premium en titanio.',
            dateAdded: '15 de Marzo, 2024'
        },
        {
            id: 2,
            name: 'Samsung Galaxy S24',
            category: 'celulares',
            price: 899.99,
            stock: 42,
            description: 'Samsung Galaxy S24 con pantalla Dynamic AMOLED 2X, cámara de 108MP y procesador Exynos 2200.',
            dateAdded: '10 de Marzo, 2024'
        },
        {
            id: 3,
            name: 'AirPods Pro 2',
            category: 'audifonos',
            price: 249.99,
            stock: 18,
            description: 'AirPods Pro con cancelación activa de ruido, sonido adaptativo y resistencia al agua IPX4.',
            dateAdded: '5 de Marzo, 2024'
        },
        {
            id: 4,
            name: 'Google Pixel 8',
            category: 'celulares',
            price: 699.99,
            stock: 8,
            description: 'Google Pixel 8 con cámara de 50MP, Tensor G3 y actualizaciones garantizadas por 5 años.',
            dateAdded: '1 de Marzo, 2024'
        }
    ]);

    // Estados para el formulario de agregar producto
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'dateAdded'>>({
        name: '',
        category: '',
        price: 0,
        stock: 0,
        description: ''
    });

    // Funciones para abrir modales
    const openAddModal = () => {
        setModalState({ add: true, details: false, delete: false });
    };

    const openDetailsModal = (product: Product) => {
        setSelectedProduct(product);
        setModalState({ add: false, details: true, delete: false });
    };

    const openDeleteModal = (product: Product) => {
        setSelectedProduct(product);
        setModalState({ add: false, details: false, delete: true });
    };

    // Funciones para cerrar modales
    const closeAddModal = () => {
        setModalState({ ...modalState, add: false });
        // Resetear formulario al cerrar
        setNewProduct({
            name: '',
            category: '',
            price: 0,
            stock: 0,
            description: ''
        });
    };

    const closeDetailsModal = () => {
        setModalState({ ...modalState, details: false });
        setSelectedProduct(null);
    };

    const closeDeleteModal = () => {
        setModalState({ ...modalState, delete: false });
        setSelectedProduct(null);
    };

    // Cerrar modal haciendo click fuera
    const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            if (modalState.add) closeAddModal();
            if (modalState.details) closeDetailsModal();
            if (modalState.delete) closeDeleteModal();
        }
    };

    // Manejar cambios en el formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value
        }));
    };

    // Agregar nuevo producto
    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();

        // Validar campos requeridos
        if (!newProduct.name || !newProduct.category || newProduct.price <= 0 || newProduct.stock < 0) {
            alert('Por favor completa todos los campos correctamente');
            return;
        }

        const newId = Math.max(...products.map(p => p.id), 0) + 1;
        const today = new Date().toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        const productToAdd: Product = {
            ...newProduct,
            id: newId,
            dateAdded: today
        };

        setProducts([...products, productToAdd]);

        // Resetear formulario
        setNewProduct({
            name: '',
            category: '',
            price: 0,
            stock: 0,
            description: ''
        });

        closeAddModal();
        alert('Producto agregado exitosamente');
    };

    // Eliminar producto
    const handleDeleteProduct = () => {
        if (selectedProduct) {
            setProducts(products.filter(p => p.id !== selectedProduct.id));
            closeDeleteModal();
            alert('Producto eliminado exitosamente');
        }
    };

    // Filtrar productos por búsqueda y categoría
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory ? product.category === filterCategory : true;
        return matchesSearch && matchesCategory;
    });

    // Estadísticas
    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => p.stock < 10).length;
    const phonesCount = products.filter(p => p.category === 'celulares').length;
    const accessoriesCount = products.filter(p => p.category === 'accesorios').length;

    // Función para obtener el icono según la categoría
    const getProductIcon = (category: string) => {
        switch (category) {
            case 'celulares':
                return '📱';
            case 'audifonos':
                return '🎧';
            case 'accesorios':
                return '🛍️';
            case 'casos':
                return '📦';
            default:
                return '🛍️';
        }
    };

    // Función para formatear el nombre de la categoría
    const formatCategoryName = (category: string) => {
        const categoryMap: { [key: string]: string } = {
            'celulares': 'Celulares',
            'accesorios': 'Accesorios',
            'casos': 'Casos',
            'audifonos': 'Audífonos'
        };
        return categoryMap[category] || category;
    };

    return {
        formatCategoryName,
        getProductIcon,
        modalState,
        selectedProduct,
        searchTerm,
        setSearchTerm,
        filterCategory,
        setFilterCategory,
        products,
        newProduct,
        openAddModal,
        openDetailsModal,
        openDeleteModal,
        closeAddModal,
        closeDetailsModal,
        closeDeleteModal,
        handleModalBackdropClick,
        handleInputChange,
        handleAddProduct,
        handleDeleteProduct,
        filteredProducts,
        totalProducts,
        lowStockProducts,
        phonesCount,
        accessoriesCount
    };
};

export default useDashboardProduct;
import { useEffect, useState } from 'react';
import { Product } from '../../../../domain/entities/Product';
import { AddProductUseCase, GetProductsUseCase, DeleteProductUseCase, UpdateProductUseCase } from '../../../../application/useCases/ProductUseCase';

const useDashboardProduct = () => {
    const [modalState, setModalState] = useState({ add: false, details: false, delete: false });
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Estados para el formulario de agregar producto
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'dateAdded'>>({
        name: '',
        category: '',
        price: 0,
        stock: 0,
        description: '',
        img: ''
    });

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const allProducts = await GetProductsUseCase();
            setProducts(allProducts);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    // Agregar nuevo producto
    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newProduct.name || !newProduct.category || newProduct.price <= 0 || newProduct.stock < 0) {
            alert('Por favor completa todos los campos correctamente');
            return;
        }

        try {
            await AddProductUseCase(newProduct);
            const updatedProducts = await GetProductsUseCase();
            setProducts(updatedProducts);
            closeAddModal();
            alert('Producto agregado exitosamente');
        } catch (err) {
            console.error(err);
            alert('Error al agregar producto');
        }
    };

    // Editar producto
    const handleUpdateProduct = async (updatedData: Product) => {
        try {
            await UpdateProductUseCase(updatedData);
            const updatedProducts = await GetProductsUseCase();
            setProducts(updatedProducts);
            closeDetailsModal();
            alert('Producto actualizado exitosamente');
        } catch (err) {
            console.error(err);
            alert('Error al actualizar producto');
        }
    };

    // Eliminar producto
    const handleDeleteProduct = async () => {
        if (selectedProduct) {
            try {
                await DeleteProductUseCase(selectedProduct.id);
                const updatedProducts = await GetProductsUseCase();
                setProducts(updatedProducts);
                closeDeleteModal();
                alert('Producto eliminado exitosamente');
            } catch (err) {
                console.error(err);
                alert('Error al eliminar producto');
            }
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

    // Funciones para abrir modales
    const openAddModal = () => setModalState({
        add: true,
        details: false,
        delete: false
    });
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
        setNewProduct({
            name: '',
            category: '',
            price: 0,
            stock: 0,
            description: '',
            img: ''
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

    return {
        loading,
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
        handleUpdateProduct,
        handleDeleteProduct,
        filteredProducts,
        totalProducts,
        lowStockProducts,
        phonesCount,
        accessoriesCount
    };
};

export default useDashboardProduct;
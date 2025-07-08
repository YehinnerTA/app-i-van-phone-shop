import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app_DB } from '../../../../domain/services/firebaseConfig';
import { ProductRegisterDto } from '../../../../application/dtos/ProductRegisterDto';

const useDashboardProduct = () => {
    const [modalState, setModalState] = useState({
        add: false,
        details: false,
        delete: false
    });
    const [selectedProduct, setSelectedProduct] = useState<(ProductRegisterDto & { id: string }) | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [products, setProducts] = useState<(ProductRegisterDto & { id: string })[]>([]);
    const [newProduct, setNewProduct] = useState<Omit<ProductRegisterDto, 'dateAdded'>>({
        name: '',
        category: 'celulares',
        price: 0,
        stock: 0,
        description: ''
    });

    // Abrir modales
    const openAddModal = () => setModalState({ add: true, details: false, delete: false });
    const openDetailsModal = (product: ProductRegisterDto & { id: string }) => {
        setSelectedProduct(product);
        setModalState({ add: false, details: true, delete: false });
    };
    const openDeleteModal = (product: ProductRegisterDto & { id: string }) => {
        setSelectedProduct(product);
        setModalState({ add: false, details: false, delete: true });
    };

    // Cerrar modales
    const closeAddModal = () => {
        setModalState(prev => ({ ...prev, add: false }));
        setNewProduct({ name: '', category: 'celulares', price: 0, stock: 0, description: '' });
    };
    const closeDetailsModal = () => {
        setModalState(prev => ({ ...prev, details: false }));
        setSelectedProduct(null);
    };
    const closeDeleteModal = () => {
        setModalState(prev => ({ ...prev, delete: false }));
        setSelectedProduct(null);
    };

    const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            if (modalState.add) closeAddModal();
            if (modalState.details) closeDetailsModal();
            if (modalState.delete) closeDeleteModal();
        }
    };

    // Manejar inputs
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value
        }));
    };

    const fetchProducts = async () => {
        try {
            const snapshot = await getDocs(collection(app_DB, 'products'));
            const data = snapshot.docs.map(docSnapshot => {
                const d = docSnapshot.data() as ProductRegisterDto;
                return {
                    ...d,
                    id: docSnapshot.id,
                    dateAdded: new Date(d.dateAdded).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                };
            });
            setProducts(data);
        } catch (error) {
            console.error('Error al obtener productos desde Firestore:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    // Agregar nuevo producto
    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, category, price, stock } = newProduct;

        if (!name || !category || price <= 0 || stock < 0) {
            alert('Por favor completa todos los campos correctamente');
            return;
        }

        const dto: ProductRegisterDto = {
            ...newProduct,
            dateAdded: new Date().toISOString()
        };

        try {
            await addDoc(collection(app_DB, 'products'), dto);
            closeAddModal();
            setNewProduct({ name: '', category: 'celulares', price: 0, stock: 0, description: '' });
            fetchProducts();
        } catch (error) {
            console.error('Error al agregar producto:', error);
            alert('Ocurrió un error al agregar el producto');
        }
    };


    // Eliminar producto
    const handleDeleteProduct = async () => {
        if (selectedProduct) {
            try {
                await deleteDoc(doc(app_DB, 'products', selectedProduct.id));
                setProducts(products.filter(p => p.id !== selectedProduct.id));
                closeDeleteModal();
            } catch (error) {
                console.error('Error al eliminar producto:', error);
                alert('Error al eliminar el producto');
            }
        }
    };


    // Filtrar productos por búsqueda y categoría
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory ? p.category === filterCategory : true)
    );

    // Estadísticas
    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => p.stock < 10).length;
    const phonesCount = products.filter(p => p.category === 'celulares').length;
    const accessoriesCount = products.filter(p => p.category === 'accesorios').length;

    // Función para obtener el icono según la categoría
    const getProductIcon = (category: string) => {
        switch (category) {
            case 'celulares': return '📱';
            case 'audifonos': return '🎧';
            case 'accesorios': return '🛍️';
            case 'casos': return '📦';
            default: return '🛍️';
        }
    };

    // Función para formatear el nombre de la categoría
    const formatCategoryName = (category: string) => {
        const map: Record<string, string> = {
            celulares: 'Celulares',
            accesorios: 'Accesorios',
            casos: 'Casos',
            audifonos: 'Audífonos'
        };
        return map[category] || category;
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
import { useEffect, useState, useCallback, useMemo } from 'react';
import { ProductDto, ProductWithId } from '../../../../application/dtos/ProductDto';
import { AddProductUseCase, GetProductsUseCase, DeleteProductUseCase, UpdateProductUseCase } from '../../../../application/useCases/ProductUseCase';
import { FirebaseProductRepository } from '../../../../domain/services/firebaseProductRepository';

const useDashboardProduct = () => {
    const productRepository = useMemo(() => new FirebaseProductRepository(), []);
    const getProductsUseCase = useMemo(() => new GetProductsUseCase(productRepository), [productRepository]);
    const addProductUseCase = useMemo(() => new AddProductUseCase(productRepository), [productRepository]);
    const updateProductUseCase = useMemo(() => new UpdateProductUseCase(productRepository), [productRepository]);
    const deleteProductUseCase = useMemo(() => new DeleteProductUseCase(productRepository), [productRepository]);

    const [modalState, setModalState] = useState({ add: false, details: false, delete: false });
    const [selectedProduct, setSelectedProduct] = useState<ProductWithId | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [products, setProducts] = useState<ProductWithId[]>([]);
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState<ProductDto>({
        name: '',
        category: '',
        price: 0,
        stock: 0,
        description: ''
    });

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const fetched: ProductWithId[] = await getProductsUseCase.execute();
            setProducts(fetched);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }, [getProductsUseCase]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !newProduct.name.trim() ||
            !newProduct.category.trim() ||
            newProduct.price <= 0 ||
            newProduct.stock < 0
        ) {
            alert('Por favor completa todos los campos correctamente');
            return;
        }

        try {
            await addProductUseCase.execute(newProduct);
            await fetchProducts();
            closeAddModal();
            alert('Producto agregado exitosamente');
        } catch (err) {
            console.error(err);
            alert('Error al agregar producto');
        }
    };

    const handleUpdateProduct = async (id: string, updatedProduct: ProductDto) => {
        try {
            await updateProductUseCase.execute(id, updatedProduct);
            await fetchProducts();
            closeDetailsModal();
            alert('Producto actualizado exitosamente');
        } catch (err) {
            console.error(err);
            alert('Error al actualizar producto');
        }
    };

    const handleDeleteProduct = async () => {
        if (!selectedProduct?.id) return;

        try {
            await deleteProductUseCase.execute(selectedProduct.id);
            await fetchProducts();
            closeDeleteModal();
            alert('Producto eliminado exitosamente');
        } catch (err) {
            console.error(err);
            alert('Error al eliminar producto');
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory ? product.category === filterCategory : true;
        return matchesSearch && matchesCategory;
    });

    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => p.stock < 10).length;
    const phonesCount = products.filter(p => p.category === 'celulares').length;
    const accessoriesCount = products.filter(p => p.category === 'accesorios').length;

    const openAddModal = () => setModalState({ add: true, details: false, delete: false });
    const openDetailsModal = (product: { id: string } & ProductDto) => {
        setSelectedProduct(product);
        setModalState({ add: false, details: true, delete: false });
    };
    const openDeleteModal = (product: { id: string } & ProductDto) => {
        setSelectedProduct(product);
        setModalState({ add: false, details: false, delete: true });
    };

    const closeAddModal = () => {
        setModalState(prev => ({ ...prev, add: false }));
        setNewProduct({
            name: '',
            category: '',
            price: 0,
            stock: 0,
            description: ''
        });
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setNewProduct(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
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
        accessoriesCount,
    };
};

export default useDashboardProduct;
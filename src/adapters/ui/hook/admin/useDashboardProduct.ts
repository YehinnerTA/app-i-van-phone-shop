import { useEffect, useState, useCallback, useMemo } from 'react';
import { Product } from '../../../../domain/entities/Product';
import { ProductDto } from '../../../../application/dtos/ProductDto';
import { AddProductUseCase, GetProductsUseCase, DeleteProductUseCase, UpdateProductUseCase } from '../../../../application/useCases/ProductUseCase';
import { FirebaseProductRepository } from '../../../../domain/services/firebaseProductRepository';

const useDashboardProduct = () => {
    const productRepository = useMemo(() => new FirebaseProductRepository(), []);
    const getProductsUseCase = useMemo(() => new GetProductsUseCase(productRepository), [productRepository]);
    const addProductUseCase = useMemo(() => new AddProductUseCase(productRepository), [productRepository]);
    const updateProductUseCase = useMemo(() => new UpdateProductUseCase(productRepository), [productRepository]);
    const deleteProductUseCase = useMemo(() => new DeleteProductUseCase(productRepository), [productRepository]);

    const [modalState, setModalState] = useState({ add: false, details: false, delete: false });
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [img, setImg] = useState<File | null>(null);
    const [newProduct, setNewProduct] = useState<Omit<ProductDto, 'img'>>({
        name: '',
        category: '',
        price: 0,
        stock: 0,
        description: ''
    });

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        const dtos = await getProductsUseCase.execute();

        const productsWithId: Product[] = dtos.map(dto => ({
            id: crypto.randomUUID(),
            name: dto.name,
            category: dto.category,
            price: dto.price,
            stock: dto.stock,
            description: dto.description,
            img: dto.img ?? '',
            dateAdded: dto.dateAdded ?? new Date()
        }));
        setProducts(productsWithId);
        setLoading(false);
    }, [getProductsUseCase]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('🔧 Enviando formulario...');
        if (
            !newProduct.name.trim() ||
            !newProduct.category.trim() ||
            isNaN(newProduct.price) || newProduct.price < 0 ||
            isNaN(newProduct.stock) || newProduct.stock < 0 ||
            !img
        ) {
            console.log('🚫 Validación fallida');
            alert('Por favor completa todos los campos correctamente');
            return;
        }

        if (!(img instanceof File)) {
            alert('Debes seleccionar una imagen válida');
            return;
        }

        try {
            await addProductUseCase.execute({ ...newProduct, imgFile: img });
            await fetchProducts();
            closeAddModal();
            alert('Producto agregado exitosamente');
        } catch (err) {
            console.error('Error al agregar producto:', err);
            alert('Error al agregar producto');
        }

    };

    const handleUpdateProduct = async (updatedData: Product) => {
        try {
            const dto: ProductDto = {
                name: updatedData.name,
                category: updatedData.category,
                price: updatedData.price,
                stock: updatedData.stock,
                description: updatedData.description,
                ...(updatedData.img instanceof File
                    ? { imgFile: updatedData.img }
                    : { img: updatedData.img })
            };
            await updateProductUseCase.execute(updatedData.id, dto);
            await fetchProducts();
            closeDetailsModal();
            alert('Producto actualizado exitosamente');
        } catch (err) {
            console.error(err);
            alert('Error al actualizar producto');
        }
    };

    const handleDeleteProduct = async () => {
        if (selectedProduct) {
            try {
                await deleteProductUseCase.execute(selectedProduct.id);
                await fetchProducts();
                closeDeleteModal();
                alert('Producto eliminado exitosamente');
            } catch (err) {
                console.error(err);
                alert('Error al eliminar producto');
            }
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
    const openDetailsModal = (product: Product) => {
        setSelectedProduct(product);
        setModalState({ add: false, details: true, delete: false });
    };
    const openDeleteModal = (product: Product) => {
        setSelectedProduct(product);
        setModalState({ add: false, details: false, delete: true });
    };

    const closeAddModal = () => {
        setModalState({ ...modalState, add: false });
        setNewProduct({ name: '', category: '', price: 0, stock: 0, description: '' });
        setImg(null);
    };

    const closeDetailsModal = () => {
        setModalState({ ...modalState, details: false });
        setSelectedProduct(null);
    };

    const closeDeleteModal = () => {
        setModalState({ ...modalState, delete: false });
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
        const { name, value } = e.target;

        if (name === 'img' && e.target instanceof HTMLInputElement && e.target.files) {
            const file = e.target.files[0];
            if (file) {
                setImg(file);
            }
            return;
        }

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
        accessoriesCount,
        img,
        setImg
    };
};

export default useDashboardProduct;
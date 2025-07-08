import { useState, useCallback } from 'react';
import { ProductRegisterDto } from '../../../application/dtos/ProductRegisterDto';
import { updateProductUseCase } from '../../../application/useCases/RegisterProductUseCase';

interface ProductWithId extends ProductRegisterDto {
    id: string;
}

interface UseModalProps {
    fetchProducts: () => Promise<void>;
}

export const useModal = ({ fetchProducts }: UseModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductWithId | null>(null);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        document.body.style.overflow = 'auto';
    }, []);

    const handleProductClick = useCallback((product: ProductWithId) => {
        setSelectedProduct(product);
        openModal();
    }, [openModal]);

    const handleModalOverlayClick = useCallback((event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }, [closeModal]);

    const handleCloseClick = useCallback(() => {
        closeModal();
    }, [closeModal]);

    const handlePrimaryButtonClick = useCallback(async () => {
        if (!selectedProduct?.id) return;

        try {
            const updatedBuyStatus = !selectedProduct.buy;

            await updateProductUseCase(selectedProduct.id, {
                buy: updatedBuyStatus,
            });

            await fetchProducts();
            alert(
                updatedBuyStatus
                    ? '¡Producto añadido al carrito!'
                    : 'Producto eliminado del carrito'
            );
            closeModal();
        } catch (error) {
            console.error('Error al actualizar el carrito:', error);
            alert('Ocurrió un error al actualizar el producto.');
        }
    }, [selectedProduct, fetchProducts, closeModal]);


    const handleAddToFavorites = useCallback(async () => {
        if (selectedProduct?.id) {
            try {
                const updatedFeatured = !selectedProduct.featured;
                await updateProductUseCase(selectedProduct.id, {
                    featured: updatedFeatured,
                });
                await fetchProducts();
                alert(
                    updatedFeatured
                        ? 'Producto añadido a destacados'
                        : 'Producto quitado de destacados'
                );
            } catch (error) {
                console.error('Error al actualizar favoritos:', error);
                alert('Ocurrió un error al actualizar el estado de favoritos');
            }
        }
    }, [selectedProduct, fetchProducts]);

    return {
        isModalOpen,
        selectedProduct,
        handleProductClick,
        handleModalOverlayClick,
        handleCloseClick,
        handlePrimaryButtonClick,
        handleAddToFavorites,
    };
};
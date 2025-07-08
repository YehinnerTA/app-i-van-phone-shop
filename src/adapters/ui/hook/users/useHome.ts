import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { app_DB } from "../../../../domain/services/firebaseConfig";
import { ProductRegisterDto } from "../../../../application/dtos/ProductRegisterDto";

interface ProductWithId extends ProductRegisterDto {
    id: string;
}

export const useHome = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<ProductWithId[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(app_DB, "products"));
            const fetchedProducts: ProductWithId[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();

                fetchedProducts.push({
                    id: doc.id,
                    name: data.name,
                    price: data.price,
                    // oldPrice: data.oldPrice || "",
                    image: data.image || "src/assets/default-product.png",
                    category: data.category,
                    stock: data.stock,
                    description: data.description,
                    dateAdded: data.dateAdded,
                    sku: data.sku || "",
                    status: data.status || "active",
                    featured: data.featured || false,
                });
            });

            setProducts(fetchedProducts);
        } catch (error) {
            console.error("Error fetching products from Firestore:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredFeaturedProducts = products.filter(product => product.featured);

    return {
        searchTerm,
        setSearchTerm,
        filteredProducts,
        filteredFeaturedProducts,
        fetchProducts,
        loading,
    };
};
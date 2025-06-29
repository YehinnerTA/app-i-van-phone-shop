import { useState } from "react";

export interface Product {
    name: string;
    price: string;
    oldPrice: string;
    image: string;
}

export const useHome = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products] = useState<Product[]>([
        {
            name: "iPhone 15 Pro",
            price: "$999",
            oldPrice: "$1,199",
            image: "src/assets/images/apple-iphone13.png"
        },
        {
            name: "Samsung Galaxy S24",
            price: "$849",
            oldPrice: "$999",
            image: "src/assets/images/apple-iphone13.png"
        },
        {
            name: "Xiaomi 14 Ultra",
            price: "$649",
            oldPrice: "$799",
            image: "src/assets/images/apple-iphone13.png"
        },
        {
            name: "OnePlus 12",
            price: "$599",
            oldPrice: "$699",
            image: "src/assets/images/apple-iphone13.png"
        }
    ]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
        searchTerm,
        setSearchTerm,
        filteredProducts
    };
};
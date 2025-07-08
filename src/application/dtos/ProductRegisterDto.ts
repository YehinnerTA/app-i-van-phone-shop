export interface ProductRegisterDto {
    name: string;
    category: 'celulares' | 'accesorios' | 'casos' | 'audifonos';
    price: number;
    stock: number;
    description: string;
    dateAdded: string;

    sku?: string;
    image?: string;
    status?: 'active' | 'inactive' | 'archived';

    // Detalles Especificos
    screen?: string;         // Pantalla
    processor?: string;      // Procesador
    memory?: string;         // Memoria
    camera?: string;         // Cámara
    battery?: string;        // Batería
    system?: string;         // Sistema
    connectivity?: string;   // Conectividad

    featured?: boolean;
}
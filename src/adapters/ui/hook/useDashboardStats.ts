import { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { app_DB } from '../../../domain/services/firebaseConfig';

type SalesData = { mes: string; ventas: number; pedidos: number };
type ProductSales = { nombre: string; ventas: number };
type OrderProduct = { name: string; quantity: number };

const useDashboardStats = () => {
    const [ventasHoy, setVentasHoy] = useState(0);
    const [totalPedidos, setTotalPedidos] = useState(0);
    const [totalClientes, setTotalClientes] = useState(0);
    const [totalProductos, setTotalProductos] = useState(0);
    const [ventasMensuales, setVentasMensuales] = useState<SalesData[]>([]);
    const [productosMasVendidos, setProductosMasVendidos] = useState<ProductSales[]>([]);

    const esHoy = (fecha: Timestamp | Date | null | undefined) => {
        if (!fecha) return false;
        const date = fecha instanceof Timestamp ? fecha.toDate() : new Date(fecha);
        const hoy = new Date();
        return (
            date.getDate() === hoy.getDate() &&
            date.getMonth() === hoy.getMonth() &&
            date.getFullYear() === hoy.getFullYear()
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            const ordersSnapshot = await getDocs(collection(app_DB, 'orders'));
            const orders = ordersSnapshot.docs.map(doc => doc.data());

            const ventasHoyCalc = orders
                .filter(o => esHoy(o.createdAt))
                .reduce((acc, o) => acc + (o.total || 0), 0);
            setVentasHoy(ventasHoyCalc);
            setTotalPedidos(orders.length);

            const ventasPorMes: { [key: string]: { ventas: number; pedidos: number } } = {};
            const productosContador: { [key: string]: number } = {};

            orders.forEach(o => {
                const fecha = new Date(o.createdAt?.seconds ? o.createdAt.seconds * 1000 : o.createdAt);
                const mes = fecha.toLocaleString('es-ES', { month: 'short' });

                if (!ventasPorMes[mes]) {
                    ventasPorMes[mes] = { ventas: 0, pedidos: 0 };
                }

                ventasPorMes[mes].ventas += o.total || 0;
                ventasPorMes[mes].pedidos += 1;

                (o.products as OrderProduct[])?.forEach((p) => {
                    productosContador[p.name] = (productosContador[p.name] || 0) + p.quantity;
                });
            });

            setVentasMensuales(
                Object.entries(ventasPorMes).map(([mes, datos]) => ({
                    mes,
                    ventas: datos.ventas,
                    pedidos: datos.pedidos,
                }))
            );

            const topProductos = Object.entries(productosContador)
                .map(([nombre, ventas]) => ({ nombre, ventas }))
                .sort((a, b) => b.ventas - a.ventas)
                .slice(0, 7);

            setProductosMasVendidos(topProductos);

            const usersSnapshot = await getDocs(collection(app_DB, 'users'));
            setTotalClientes(usersSnapshot.size);

            const productsSnapshot = await getDocs(collection(app_DB, 'products'));
            setTotalProductos(productsSnapshot.size);
        };

        fetchData();
    }, []);

    return {
        ventasHoy,
        totalPedidos,
        totalClientes,
        totalProductos,
        ventasMensuales,
        productosMasVendidos,
    };
};

export default useDashboardStats;
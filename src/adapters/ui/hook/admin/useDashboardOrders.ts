import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { app_DB } from '../../../../domain/services/firebaseConfig';
import { Order } from '../../../../domain/entities/Order';

const useDashboardOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
    const [newStatus, setNewStatus] = useState<Order['status']>('En Espera');
    const [newPaymentStatus, setNewPaymentStatus] = useState<Order['paymentStatus']>('pendiente');
    const [filtroEstado, setFiltroEstado] = useState<string>('');
    const [filtroPago, setFiltroPago] = useState<string>('');
    const [filtroFecha, setFiltroFecha] = useState<string>('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [orderDetail, setOrderDetail] = useState<Order | null>(null);

    console.log("Total pedidos:", orders.length);
    console.log("Pedidos con estado:", filtroEstado, orders.filter(order => order.status === filtroEstado).length);
    console.log("Pedidos con método de pago:", filtroPago, orders.filter(order => order.paymentMethod === filtroPago).length);
    console.log("Pedidos con fecha:", filtroFecha, orders.filter(order => {
        if (filtroFecha === 'hoy') {
            return new Date(order.createdAt).toLocaleDateString() === '06/07/2025';
        }
        return true;
    }).length);


    const fetchOrders = async () => {
        const snapshot = await getDocs(collection(app_DB, 'orders'));
        const fetchedOrders: Order[] = [];

        snapshot.forEach(doc => {
            const data = doc.data();

            fetchedOrders.push({
                id: doc.id,
                userId: data.userId || '',
                userEmail: data.userEmail || '',
                products: Array.isArray(data.products)
                    ? data.products.map((p: Order['products'][number]) => ({
                        productId: p.productId || '',
                        name: p.name || '',
                        image: p.image || '',
                        category: p.category || '',
                        memory: p.memory || '',
                        quantity: p.quantity || 0,
                        price: p.price || 0,
                        totalPrice: p.totalPrice || 0,
                    }))
                    : [],
                subtotal: typeof data.subtotal === 'number' ? data.subtotal : 0,
                discount: typeof data.discount === 'number' ? data.discount : 0,
                total: typeof data.total === 'number' ? data.total : 0,
                paymentMethod: data.paymentMethod || 'efectivo',
                paymentDetails: {
                    cardNumber: data.paymentDetails?.cardNumber || '',
                    expiration: data.paymentDetails?.expiration || '',
                    cvv: data.paymentDetails?.cvv || '',
                    phone: data.paymentDetails?.phone || '',
                    fullName: data.paymentDetails?.fullName || '',
                },
                createdAt: data.createdAt || new Date().toISOString(),
                status: data.status || 'En Espera',
                paymentStatus: data.paymentStatus || 'pendiente',
            });
        });

        setOrders(fetchedOrders);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Estadísticas
    const pedidosTotales = orders.length;
    const pedidosCompletados = orders.filter(o => o.status === 'completo').length;
    const pedidosEspera = orders.filter(o => o.status === 'En Espera').length;
    const ventasHoy = orders
        .filter(o => new Date(o.createdAt).toLocaleDateString() === '06/07/2025') // Puedes cambiar esto a dinámico
        .reduce((acc, o) => acc + o.total, 0);

    const ordersFiltrados = orders.filter(order =>
        (filtroEstado === '' || order.status === filtroEstado) &&
        (filtroPago === '' || order.paymentMethod === filtroPago) &&
        (filtroFecha === '' || (
            filtroFecha === 'hoy'
                ? new Date(order.createdAt).toLocaleDateString() === '06/07/2025'
                : true
        ))
    );

    const mostrarPedidos = ordersFiltrados.length > 0
        ? ordersFiltrados
        : [{
            id: 'sin-datos',
            userId: 'falta dato',
            userEmail: 'falta dato',
            products: [],
            subtotal: 0,
            discount: 0,
            total: 0,
            paymentMethod: 'falta dato',
            paymentDetails: {
                cardNumber: 'falta dato',
                expiration: 'falta dato',
                cvv: 'falta dato',
                phone: 'falta dato',
                fullName: 'falta dato'
            },
            createdAt: new Date().toISOString(),
            status: 'falta dato',
            paymentStatus: 'falta dato'
        }];

    // Funciones para manipular pedidos
    const verDetalle = (orderId: string) => {
        const pedido = orders.find(o => o.id === orderId);
        if (pedido) {
            setOrderDetail(pedido);
            setShowDetailModal(true);
        }
    };

    // Agregar estas nuevas funciones
    const cerrarModalDetalle = () => {
        setShowDetailModal(false);
        setOrderDetail(null);
    };

    const handleDetailModalClick = (e: React.MouseEvent) => {
        if ((e.target as Element).className === 'dashboard-orders-modal') {
            cerrarModalDetalle();
        }
    };

    const cambiarEstado = (orderId: string) => {
        const pedido = orders.find(o => o.id === orderId);
        if (pedido) {
            setNewStatus(pedido.status || 'En Espera');
            setNewPaymentStatus(pedido.paymentStatus || 'pendiente');
            setCurrentOrderId(orderId);
            setShowModal(true);
        }
    };

    const actualizarPedido = (orderId: string, status: Order['status'], paymentStatus: Order['paymentStatus']) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status, paymentStatus } : order
        ));
    };

    const marcarEntregado = (orderId: string) => {
        if (confirm(`¿Confirmar que el pedido ${orderId} ha sido entregado?`)) {
            actualizarPedido(orderId, 'completo', 'pagado');
            alert(`Pedido ${orderId} marcado como entregado`);
        }
    };

    const confirmarPago = (orderId: string) => {
        if (confirm(`¿Confirmar el pago del pedido ${orderId}?`)) {
            actualizarPedido(orderId, 'procesado', 'pagado');
            alert(`Pago del pedido ${orderId} confirmado`);
        }
    };

    const procesarPedido = (orderId: string) => {
        if (confirm(`¿Iniciar el procesamiento del pedido ${orderId}?`)) {
            actualizarPedido(orderId, 'procesado', 'pagado');
            alert(`Procesando pedido ${orderId}`);
        }
    };

    const guardarCambios = () => {
        if (currentOrderId) {
            actualizarPedido(currentOrderId, newStatus, newPaymentStatus);
            alert(`Estado actualizado para ${currentOrderId}: ${newStatus} - ${newPaymentStatus}`);
        }
        cerrarModal();
    };

    const cerrarModal = () => {
        setShowModal(false);
        setCurrentOrderId(null);
    };

    const handleModalClick = (e: React.MouseEvent) => {
        if ((e.target as Element).className === 'dashboard-orders-modal') {
            cerrarModal();
        }
    };

    // Función para manejar el cambio de estado con validación de tipos
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as Order['status'];
        setNewStatus(value);
    };

    // Función para manejar el cambio de estado de pago con validación de tipos
    const handlePaymentStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (['pendiente', 'pagado', 'reembolsado'].includes(value)) {
            setNewPaymentStatus(value as 'pendiente' | 'pagado' | 'reembolsado');
        }
    };

    return {
        handleStatusChange,
        handlePaymentStatusChange,
        pedidosFiltrados: ordersFiltrados,
        setPedidos: setOrders,
        showModal,
        currentOrderId,
        newStatus,
        newPaymentStatus,
        pedidosTotales,
        pedidosCompletados,
        pedidosEspera,
        ventasHoy,
        verDetalle,
        cambiarEstado,
        marcarEntregado,
        confirmarPago,
        procesarPedido,
        guardarCambios,
        cerrarModal,
        handleModalClick,
        filtroEstado,
        setFiltroEstado,
        filtroPago,
        setFiltroPago,
        filtroFecha,
        setFiltroFecha,
        showDetailModal,
        pedidoDetalle: orderDetail,
        cerrarModalDetalle,
        handleDetailModalClick,
        mostrarPedidos,
    };
};

export default useDashboardOrders;
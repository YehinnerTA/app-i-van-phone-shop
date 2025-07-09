import { useEffect, useState } from 'react';
import { Order } from '../../../../domain/entities/Order';
import { app_DB } from '../../../../domain/services/firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

export type EstadoPedido = 'pending' | 'espera' | 'procesando' | 'completado' | 'cancelado';
export type EstadoPago = 'pendiente' | 'pagado' | 'reembolsado';
export type MetodoPago = 'online' | 'efectivo';

export const useDashboardOrders = () => {
    const [pedidos, setPedidos] = useState<Order[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
    const [newStatus, setNewStatus] = useState<EstadoPedido>('espera');
    const [newPaymentStatus, setNewPaymentStatus] = useState<EstadoPago>('pendiente');
    const [filtroEstado, setFiltroEstado] = useState<string>('');
    const [filtroPago, setFiltroPago] = useState<string>('');
    const [filtroFecha, setFiltroFecha] = useState<string>('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [pedidoDetalle, setPedidoDetalle] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const snapshot = await getDocs(collection(app_DB, 'orders'));
                const data: Order[] = snapshot.docs.map(doc => {
                    const order = doc.data() as Order;
                    return {
                        ...order,
                        id: doc.id,
                    };
                });
                setPedidos(data);
            } catch (error) {
                console.error('Error al obtener pedidos de Firebase:', error);
            }
        };

        fetchOrders();
    }, []);

    const traducirEstado = (estado?: Order['status']): EstadoPedido => {
        switch (estado) {
            case 'pending': return 'espera';
            case 'processing': return 'procesando';
            case 'completed': return 'completado';
            case 'cancelled': return 'cancelado';
            default: return 'espera';
        }
    };

    const traducirPago = (pago?: Order['paymentStatus']): EstadoPago => pago || 'pendiente';
    const traducirMetodo = (metodo: Order['paymentMethod']): MetodoPago =>
        metodo === 'cash' ? 'efectivo' : 'online';
    const hoy = new Date().toLocaleDateString('es-PE');

    // Estadísticas calculadas
    const pedidosTotales = pedidos.length;
    const pedidosCompletados = pedidos.filter(p => traducirEstado(p.status) === 'completado').length;
    const pedidosEspera = pedidos.filter(p => traducirEstado(p.status) === 'espera').length;
    const ventasHoy = pedidos
        .filter(p => new Date(p.createdAt).toLocaleDateString('es-PE').includes(hoy))
        .reduce((sum, p) => sum + p.total, 0);

    // Filtrar pedidos
    const pedidosFiltrados = pedidos.filter(pedido => {
        const estadoTraducido = traducirEstado(pedido.status);
        const metodoTraducido = traducirMetodo(pedido.paymentMethod);

        return (
            (filtroEstado === '' || estadoTraducido === filtroEstado) &&
            (filtroPago === '' || metodoTraducido === filtroPago) &&
            (filtroFecha === '' || (
                filtroFecha === 'hoy' ? new Date(pedido.createdAt).toLocaleDateString('es-PE').includes(hoy) :
                    filtroFecha === 'semana' ? true : // TODO
                        filtroFecha === 'mes' ? true : // TODO
                            true
            ))
        );
    });

    // Funciones para manipular pedidos
    const verDetalle = (pedidoId: string) => {
        const pedido = pedidos.find(p => p.id === pedidoId);
        if (pedido) {
            setPedidoDetalle(pedido);
            setShowDetailModal(true);
        }
    };

    // Agregar estas nuevas funciones
    const cerrarModalDetalle = () => {
        setShowDetailModal(false);
        setPedidoDetalle(null);
    };

    const handleDetailModalClick = (e: React.MouseEvent) => {
        if ((e.target as Element).className === 'dashboard-orders-modal') {
            cerrarModalDetalle();
        }
    };

    const cambiarEstado = (pedidoId: string) => {
        const pedido = pedidos.find(p => p.id === pedidoId);
        if (pedido) {
            setNewStatus(traducirEstado(pedido.status));
            setNewPaymentStatus(traducirPago(pedido.paymentStatus));
            setCurrentOrderId(pedidoId);
            setShowModal(true);
        }
    };

    const estadoLabels = {
        processing: "Procesando",
        pending: "En Espera",
        completed: "Completado",
        cancelled: "Cancelado",
    };

    const pagoLabels: Record<string, string> = {
        online: 'Pago Online',
        efectivo: 'Efectivo',
        pagado: 'Pagado',
        pendiente: 'Pendiente',
        reembolsado: 'Reembolsado',
    };

    const actualizarPedido = async (pedidoId: string, estado: EstadoPedido, pago: EstadoPago) => {
        const statusMap: Record<EstadoPedido, Order['status']> = {
            espera: 'pending',
            procesando: 'processing',
            completado: 'completed',
            cancelado: 'cancelled',
            pending: 'pending',
        };

        const statusFirebase = statusMap[estado];

        try {
            const pedidoRef = doc(app_DB, 'orders', pedidoId);
            await updateDoc(pedidoRef, {
                status: statusFirebase,
                paymentStatus: pago,
            });
            setPedidos(prev =>
                prev.map(pedido =>
                    pedido.id === pedidoId
                        ? { ...pedido, status: statusFirebase, paymentStatus: pago }
                        : pedido
                )
            );
        } catch (error) {
            console.error(`Error actualizando pedido ${pedidoId}:`, error);
            alert('Error al actualizar el pedido en Firebase');
        }
    };

    const marcarEntregado = async (pedidoId: string) => {
        if (confirm(`¿Confirmar que el pedido ${pedidoId} ha sido entregado?`)) {
            await actualizarPedido(pedidoId, 'completado', 'pagado');
            alert(`Pedido ${pedidoId} marcado como entregado`);
        }
    };

    const confirmarPago = (pedidoId: string) => {
        if (confirm(`¿Confirmar el pago del pedido ${pedidoId}?`)) {
            actualizarPedido(pedidoId, 'procesando', 'pagado');
            alert(`Pago del pedido ${pedidoId} confirmado`);
        }
    };

    const procesarPedido = (pedidoId: string) => {
        if (confirm(`¿Iniciar el procesamiento del pedido ${pedidoId}?`)) {
            actualizarPedido(pedidoId, 'procesando', 'pagado');
            alert(`Procesando pedido ${pedidoId}`);
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
        const value = e.target.value;
        if (['espera', 'procesando', 'completado', 'cancelado'].includes(value)) {
            setNewStatus(value as EstadoPedido);
        }
    };

    // Función para manejar el cambio de estado de pago con validación de tipos
    const handlePaymentStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (['pendiente', 'pagado', 'reembolsado'].includes(value)) {
            setNewPaymentStatus(value as EstadoPago);
        }
    };

    return {
        handleStatusChange,
        handlePaymentStatusChange,
        pedidosFiltrados,
        setPedidos,
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
        pedidoDetalle,
        cerrarModalDetalle,
        handleDetailModalClick,
        estadoLabels,
        pagoLabels,
    };
};
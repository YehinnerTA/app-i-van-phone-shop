import { useState } from 'react';

export interface ProductoPedido {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

export type EstadoPedido = 'espera' | 'procesando' | 'completado' | 'cancelado';
export type EstadoPago = 'pendiente' | 'pagado' | 'reembolsado';
export type MetodoPago = 'online' | 'efectivo';

export interface Pedido {
    id: string;
    fecha: string;
    cliente: {
        nombre: string;
        telefono: string;
        email: string;
    };
    productos: ProductoPedido[];
    estado: EstadoPedido;
    pago: EstadoPago;
    metodoPago: MetodoPago;
    total: number;
}

const initialPedidos: Pedido[] = [
    {
        id: 'PED-001',
        fecha: '06/07/2025 - 10:30',
        cliente: {
            nombre: 'Carlos Mendoza',
            telefono: '+51 987 654 321',
            email: 'carlos@email.com'
        },
        productos: [
            { id: 1, name: 'iPhone 15 Pro Max', quantity: 1, price: 1299 },
            { id: 5, name: 'Case Protector', quantity: 1, price: 25 }
        ],
        estado: 'completado',
        pago: 'pagado',
        metodoPago: 'online',
        total: 1324
    },
    {
        id: 'PED-002',
        fecha: '06/07/2025 - 11:45',
        cliente: {
            nombre: 'Ana García',
            telefono: '+51 912 345 678',
            email: 'ana@email.com'
        },
        productos: [
            { id: 2, name: 'Samsung Galaxy S24', quantity: 1, price: 899 },
            { id: 6, name: 'Audífonos Wireless', quantity: 1, price: 129 }
        ],
        estado: 'espera',
        pago: 'pendiente',
        metodoPago: 'efectivo',
        total: 1028
    },
    {
        id: 'PED-003',
        fecha: '06/07/2025 - 14:20',
        cliente: {
            nombre: 'Luis Rodríguez',
            telefono: '+51 956 789 012',
            email: 'luis@email.com'
        },
        productos: [
            { id: 7, name: 'Xiaomi Mi 13', quantity: 2, price: 599 }
        ],
        estado: 'espera',
        pago: 'pendiente',
        metodoPago: 'online',
        total: 1198
    }
];

const useDashboardOrders = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>(initialPedidos);
    const [showModal, setShowModal] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
    const [newStatus, setNewStatus] = useState<EstadoPedido>('espera');
    const [newPaymentStatus, setNewPaymentStatus] = useState<EstadoPago>('pendiente');
    const [filtroEstado, setFiltroEstado] = useState<string>('');
    const [filtroPago, setFiltroPago] = useState<string>('');
    const [filtroFecha, setFiltroFecha] = useState<string>('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [pedidoDetalle, setPedidoDetalle] = useState<Pedido | null>(null);

    // Estadísticas calculadas
    const pedidosTotales = pedidos.length;
    const pedidosCompletados = pedidos.filter(p => p.estado === 'completado').length;
    const pedidosEspera = pedidos.filter(p => p.estado === 'espera').length;
    const ventasHoy = pedidos
        .filter(p => p.fecha.includes('06/07/2025'))
        .reduce((sum, p) => sum + p.total, 0);

    // Filtrar pedidos
    const pedidosFiltrados = pedidos.filter(pedido => {
        return (
            (filtroEstado === '' || pedido.estado === filtroEstado) &&
            (filtroPago === '' || pedido.metodoPago === filtroPago) &&
            (filtroFecha === '' || (
                filtroFecha === 'hoy' ? pedido.fecha.includes('06/07/2025') :
                    filtroFecha === 'semana' ? true : // Lógica para semana
                        filtroFecha === 'mes' ? true : // Lógica para mes
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
            setNewStatus(pedido.estado);
            setNewPaymentStatus(pedido.pago);
            setCurrentOrderId(pedidoId);
            setShowModal(true);
        }
    };

    const actualizarPedido = (pedidoId: string, estado: EstadoPedido, pago: EstadoPago) => {
        setPedidos(pedidos.map(pedido =>
            pedido.id === pedidoId
                ? { ...pedido, estado, pago }
                : pedido
        ));
    };

    const marcarEntregado = (pedidoId: string) => {
        if (confirm(`¿Confirmar que el pedido ${pedidoId} ha sido entregado?`)) {
            actualizarPedido(pedidoId, 'completado', 'pagado');
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
            setNewStatus(value as 'espera' | 'procesando' | 'completado' | 'cancelado');
        }
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
    };
};

export default useDashboardOrders;
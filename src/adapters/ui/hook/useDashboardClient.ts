import { useState } from 'react';

interface Cliente {
    id: number;
    nombre: string;
    imagen: string;
    estado: string;
    Registor: string;
    email?: string;
    celular?: string;
    dni?: string;
}

export const useDashboardClient = () => {
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [previewImg, setPreviewImg] = useState<string | null>(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [dni, setDni] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
    const [clientes, setClientes] = useState<Cliente[]>([
        { id: 1, nombre: 'Yehinner Torres', imagen: 'src/assets/icons/Producto.svg', estado: 'cajero', Registor: '15/12/2025' },
        { id: 2, nombre: 'Nicolas Astorga', imagen: 'src/assets/icons/Producto.svg', estado: 'vendedor', Registor: '15/12/2029' },
        { id: 3, nombre: 'Angel Bonifacio', imagen: 'src/assets/icons/Producto.svg', estado: 'vendedor', Registor: '15/12/2029' },
        { id: 4, nombre: 'Ariana Ypanaque', imagen: 'src/assets/icons/Producto.svg', estado: 'cajero', Registor: '15/12/2029' },
        { id: 5, nombre: 'Eros Sanchez', imagen: 'src/assets/icons/Producto.svg', estado: 'vendedor', Registor: '15/12/2029' },
    ]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (ev) => {
                setPreviewImg(ev.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLimpiar = () => {
        setPreviewImg(null);
        setNombre('');
        setEmail('');
        setCelular('');
        setDni('');
        setContrasena('');
    };

    const handleView = (id: number) => {
        const cliente = clientes.find(c => c.id === id);
        if (cliente) {
            setSelectedClient(cliente);
            setShowViewModal(true);
        }
    };

    const handleEdit = (id: number) => {
        const cliente = clientes.find(c => c.id === id);
        if (cliente) {
            setSelectedClient({ ...cliente });
            setShowViewModal(false);
            setShowEditModal(true);
        }
    };

    const handleSaveEdit = () => {
        if (selectedClient) {
            setClientes(prev => prev.map(c =>
                c.id === selectedClient.id ? { ...selectedClient } : { ...c }
            ));
            setShowEditModal(false);
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
            setTimeout(() => {
                setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== id));
            }, 300);
        }
    };

    const filteredClient = clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
        showModal,
        setShowModal,
        showViewModal,
        setShowViewModal,
        showEditModal,
        setShowEditModal,
        selectedClient,
        setSelectedClient,
        previewImg,
        handleImageChange,
        nombre,
        setNombre,
        email,
        setEmail,
        celular,
        setCelular,
        dni,
        setDni,
        contrasena,
        setContrasena,
        handleLimpiar,
        handleView,
        handleEdit,
        handleSaveEdit,
        handleDelete,
        filteredClient,
        searchTerm,
        setSearchTerm,
        clientes,
    };
};
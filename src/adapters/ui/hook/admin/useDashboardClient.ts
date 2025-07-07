import { useEffect, useState } from 'react';
import { FirebaseAuthRepository } from '../../../../domain/services/firebaseAuthRepository';
import { ClientRegisterDto } from '../../../../application/dtos/ClientRegisterDto';
import { collection, getDocs } from 'firebase/firestore';
import { app_DB } from '../../../../domain/services/firebaseConfig';

export const useDashboardClient = () => {
    const authRepo = new FirebaseAuthRepository();
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [dni, setDni] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [estado, setEstado] = useState<'admin' | 'cliente' | 'vendedor' | 'cajero'>('vendedor');
    const [selectedClient, setSelectedClient] = useState<ClientRegisterDto | null>(null);
    const [clientes, setClientes] = useState<ClientRegisterDto[]>([]);

    const handleLimpiar = () => {
        setNombre('');
        setEmail('');
        setCelular('');
        setDni('');
        setContrasena('');
        setEstado('vendedor');
    };

    const fetchClientes = async () => {
        const snapshot = await getDocs(collection(app_DB, 'users'));
        const users: ClientRegisterDto[] = [];

        snapshot.forEach(doc => {
            const data = doc.data();
            users.push({
                name: data.name,
                email: data.email,
                password: data.contrasena,
                role: data.role,
                phone: data.phone || '',
                dni: data.dni || '',
            });
        });

        setClientes(users);
    };

    useEffect(() => {
        fetchClientes();
    }, []);


    const handleView = (email: string) => {
        const cliente = clientes.find(c => c.email === email);
        if (cliente) {
            setSelectedClient(cliente);
            setShowViewModal(true);
        }
    };

    const handleEdit = (email: string) => {
        const cliente = clientes.find(c => c.email === email);
        if (cliente) {
            setSelectedClient({ ...cliente });
            setShowViewModal(false);
            setShowEditModal(true);
        }
    };

    const handleSaveEdit = () => {
        if (selectedClient) {
            setClientes(prev =>
                prev.map(c =>
                    c.email === selectedClient.email ? { ...selectedClient } : { ...c }
                )
            );
            setShowEditModal(false);
        }
    };

    const handleDelete = (email: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
            setClientes(prev => prev.filter(c => c.email !== email));
        }
    };

    const handleAddClient = async () => {
        try {
            const clientDto: ClientRegisterDto = {
                name: nombre,
                email,
                password: contrasena,
                role: estado,
                phone: celular,
                dni,
            };

            await authRepo.registerClient(clientDto);
            await fetchClientes();

            handleLimpiar();
            setShowModal(false);
            alert('Cliente registrado exitosamente.');
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert('Error al registrar cliente: ' + error.message);
            } else {
                alert('Error desconocido al registrar cliente.');
            }
        }
    };

    const filteredClient = clientes.filter(cliente =>
        cliente.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (field: keyof ClientRegisterDto, value: string) => {
        if (selectedClient) {
            setSelectedClient({
                ...selectedClient,
                [field]: value,
            });
        }
    };


    return {
        handleInputChange,
        showModal,
        setShowModal,
        showViewModal,
        setShowViewModal,
        showEditModal,
        setShowEditModal,
        selectedClient,
        setSelectedClient,
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
        handleAddClient,
        filteredClient,
        searchTerm,
        setSearchTerm,
        clientes,
        estado, setEstado,
    };
};
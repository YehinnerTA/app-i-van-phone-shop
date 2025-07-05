import { useState } from 'react';

export const useDashboardClient = () => {
    const [showModal, setShowModal] = useState(false);
    const [previewImg, setPreviewImg] = useState<string | null>(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [dni, setDni] = useState('');
    const [contrasena, setContrasena] = useState('');

    const productos = [
        { id: 1, nombre: 'Producto', imagen: 'src/assets/icons/Producto.svg' },
        { id: 2, nombre: 'Producto', imagen: 'src/assets/icons/Producto.svg' },
        { id: 3, nombre: 'Producto', imagen: 'src/assets/icons/Producto.svg' },
        { id: 4, nombre: 'Producto', imagen: 'src/assets/icons/Producto.svg' },
        { id: 5, nombre: 'Producto', imagen: 'src/assets/icons/Producto.svg' },
    ];

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

    return {
        showModal,
        setShowModal,
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
        productos,
    };
};
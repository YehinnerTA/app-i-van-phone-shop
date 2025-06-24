import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

interface UserData {
    fullName: string;
    email: string;
    phone: string;
    dni: string;
    birthDate: string;
    address: string;
    district: string;
    zipCode: string;
    city: string;
}

interface PasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const useProfile = () => {
    const [userData, setUserData] = useState<UserData>({
        fullName: "Juan Pérez Rodríguez",
        email: "juan.perez@email.com",
        phone: "+51 987 654 321",
        dni: "12345678",
        birthDate: "1990-05-15",
        address: "Av. Javier Prado Este 123",
        district: "San Isidro",
        zipCode: "15036",
        city: "Lima"
    });

    const [passwordData, setPasswordData] = useState<PasswordData>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const history = useHistory();

    // Función para generar iniciales del avatar
    const generateInitials = (name: string): string => {
        return name
            .split(' ')
            .map((word: string) => word.charAt(0))
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    // Función para manejar cambios en los inputs
    const handleInputChange = (field: keyof UserData, value: string) => {
        setUserData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Función para manejar cambios en los inputs de contraseña
    const handlePasswordChange = (field: keyof PasswordData, value: string) => {
        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }));
        // Limpiar errores cuando el usuario empiece a escribir
        if (passwordErrors.length > 0) {
            setPasswordErrors([]);
        }
    };

    // Función para guardar perfil
    const saveProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setSaveStatus('saving');

        try {
            // Simular guardado
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSaveStatus('saved');

            setTimeout(() => {
                setSaveStatus('idle');
            }, 2000);
        } catch (error) {
            console.error('Error saving profile:', error);
            setSaveStatus('idle');
        } finally {
            setIsLoading(false);
        }
    };

    // Función para cambiar contraseña
    const changePassword = () => {
        setShowPasswordModal(true);
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        setPasswordErrors([]);
    };

    // Función para cerrar modal de contraseña
    const closePasswordModal = () => {
        setShowPasswordModal(false);
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        setPasswordErrors([]);
        setShowPasswords({
            current: false,
            new: false,
            confirm: false
        });
    };

    // Función para cambiar contraseña
    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors: string[] = [];

        // Validar contraseña actual
        if (!passwordData.currentPassword) {
            errors.push("La contraseña actual es requerida");
        }

        // Validar confirmación de contraseña
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            errors.push("Las contraseñas nuevas no coinciden");
        }

        // Validar que no sea la misma contraseña
        if (passwordData.currentPassword === passwordData.newPassword) {
            errors.push("La nueva contraseña debe ser diferente a la actual");
        }

        if (errors.length > 0) {
            setPasswordErrors(errors);
            return;
        }

        setIsLoading(true);
        try {
            // Simular cambio de contraseña
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert("Contraseña cambiada exitosamente");
            closePasswordModal();
        } catch (error) {
            console.error('Error changing password:', error);
            setPasswordErrors(["Error al cambiar la contraseña. Inténtalo de nuevo."]);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para alternar visibilidad de contraseña
    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    // Función para confirmar logout
    const confirmLogout = () => {
        history.push('/');
    };

    // Función para volver atrás
    const goBack = () => {
        history.push('/home');
    };

    // Efecto para animaciones de entrada
    useEffect(() => {
        const elements = document.querySelectorAll('.form-section, .profile-section');
        elements.forEach((el, index) => {
            const htmlElement = el as HTMLElement;
            htmlElement.style.opacity = '0';
            htmlElement.style.transform = 'translateY(20px)';

            setTimeout(() => {
                htmlElement.style.transition = 'all 0.6s ease';
                htmlElement.style.opacity = '1';
                htmlElement.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }, []);

    // Función para obtener el texto del botón de guardar
    const getSaveButtonText = (): string => {
        switch (saveStatus) {
            case 'saving':
                return 'Guardando...';
            case 'saved':
                return 'Guardado ✓';
            default:
                return 'Guardar Cambios';
        }
    };

    // Función para obtener el estilo del botón de guardar
    const getSaveButtonStyle = (): React.CSSProperties => {
        switch (saveStatus) {
            case 'saving':
                return { background: 'linear-gradient(135deg, #ffc107, #fd7e14)' };
            case 'saved':
                return { background: 'linear-gradient(135deg, #28a745, #20c997)' };
            default:
                return {};
        }
    };

    return {
        userData,
        passwordData,
        isLoading,
        showPasswordModal,
        showPasswords,
        generateInitials,
        handleInputChange,
        handlePasswordChange,
        saveProfile,
        changePassword,
        handlePasswordSubmit,
        togglePasswordVisibility,
        confirmLogout,
        goBack,
        getSaveButtonText,
        getSaveButtonStyle,
        closePasswordModal,
        passwordErrors,
    };
};
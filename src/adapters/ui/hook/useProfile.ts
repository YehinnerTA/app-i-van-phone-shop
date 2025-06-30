import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { getAuth, onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { getUserProfile, updateUserProfile } from "../../../domain/services/firebaseUserService";
import { User } from "../../../domain/entities/User";

export const formatDateOnly = (value: unknown): string => {
    try {
        if (!value) return "";
        if (typeof (value as { toDate?: () => Date }).toDate === "function") {
            value = (value as { toDate: () => Date }).toDate();
        }
        return new Date(value as string | number | Date).toLocaleDateString("es-PE");
    } catch {
        return "";
    }
};

export const useProfile = () => {
    const [userData, setUserData] = useState<Partial<User>>({});
    const [passwordData, setPasswordData] = useState({
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

    const [uid, setUid] = useState<string | null>(null);
    const history = useHistory();

    // Funciones Firebase
    const handleInputChange = (field: keyof User, value: string) => {
        setUserData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePasswordChange = (field: keyof typeof passwordData, value: string) => {
        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }));
        if (passwordErrors.length > 0) {
            setPasswordErrors([]);
        }
    };

    const saveProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!uid) return;
        setIsLoading(true);
        setSaveStatus('saving');

        try {
            await updateUserProfile(uid, userData);
            setSaveStatus('saved');
            setTimeout(() => { setSaveStatus('idle'); }, 2000);
        } catch (error) {
            console.error('Error al guardar perfil: ', error);
            setSaveStatus('idle');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors: string[] = [];

        if (!passwordData.currentPassword) {
            errors.push("La contraseña actual es requerida");
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            errors.push("Las contraseñas nuevas no coinciden");
        }

        if (passwordData.currentPassword === passwordData.newPassword) {
            errors.push("La nueva contraseña debe ser diferente a la actual");
        }

        if (errors.length > 0) {
            setPasswordErrors(errors);
            return;
        }

        setIsLoading(true);
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && user.email) {
            const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword);

            try {
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, passwordData.newPassword);

                console.log("Contraseña cambiada exitosamente.");
                closePasswordModal();
            } catch (error) {
                const FirebaseError = error as FirebaseError;

                console.error("Error al cambiar la contraseña: ", FirebaseError);
                if (FirebaseError.code === 'auth/wrong-password') {
                    setPasswordErrors(["La contraseña actual es incorrecta."]);
                } else if (FirebaseError.code === 'auth/too-many-requests') {
                    setPasswordErrors(["Demasiados intentos fallidos. Intenta más tarde."]);
                } else {
                    setPasswordErrors(["Error al cambiar la contraseña."]);
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            setPasswordErrors(["No se encontró el usuario actual."]);
            setIsLoading(false);
        }
    };

    // Funciones UI y Navegación
    const generateInitials = (name?: string): string => {
        return name
            ? name
                .split(' ')
                .map((word: string) => word.charAt(0))
                .join('')
                .substring(0, 2)
                .toUpperCase()
            : "";
    };

    const changePassword = () => {
        setShowPasswordModal(true);
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        setPasswordErrors([]);
    };

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

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const confirmLogout = () => {
        history.push('/');
    };

    const goBack = () => {
        history.push('/home');
    };

    // Estilo dinámico
    const getSaveButtonText = (): string => {
        return saveStatus === 'saving'
            ? 'Guardando...'
            : saveStatus === 'saved'
                ? 'Guardado ✓'
                : 'Guardar Cambios';
    };

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

    // Logica y Animación
    useEffect(() => {
        // Firebase
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUid(user.uid);
                const profile = await getUserProfile(user.uid);
                const lastAccess = user.metadata.lastSignInTime || "";

                if (profile) {
                    setUserData({
                        ...profile,
                        lastAccess
                    });
                }
            } else {
                history.push("/login");
            }
        });

        // Animación
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

        return () => unsubscribe();
    }, [history]);

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
export interface User {
    uid: string;
    name: string;
    email: string;
    createAt: Date;

    phone?: string;
    dni?: string;
    birthDate?: string;
    address?: string;
    district?: string;
    zipCode?: string;
    city?: string;

    lastAccess?: string;
}
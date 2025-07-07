export interface ClientRegisterDto {
    name: string;
    email: string;
    password: string;
    role: "cliente" | "admin" | "cajero" | "vendedor";
    phone?: string;
    dni?: string;
}
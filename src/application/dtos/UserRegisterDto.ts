export interface UserRegisterDto {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: "cliente" | "admin";
}
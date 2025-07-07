import { UserLoginDto } from "../../application/dtos/UserLoginDto";
import { UserRegisterDto } from "../../application/dtos/UserRegisterDto";
import { ClientRegisterDto } from "../../application/dtos/ClientRegisterDto";

export interface IUserRepository {
    registerClient(clienDto: ClientRegisterDto): Promise<void>;
    registerUser(userDto: UserRegisterDto): Promise<void>;
    loginUser(userDto: UserLoginDto): Promise<{ uid: string; email: string; role: string }>;
}
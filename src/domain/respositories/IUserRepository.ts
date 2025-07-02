import { UserLoginDto } from "../../application/dtos/UserLoginDto";
import { UserRegisterDto } from "../../application/dtos/UserRegisterDto";

export interface IUserRepository {
    registerUser(userDto: UserRegisterDto): Promise<void>;
    loginUser(userDto: UserLoginDto): Promise<{ uid: string; email: string; role: string }>;
}
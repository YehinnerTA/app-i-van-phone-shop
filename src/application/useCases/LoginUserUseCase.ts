import { UserLoginDto } from "../dtos/UserLoginDto";
import { IUserRepository } from "../../domain/respositories/IUserRepository";

export class LoginUserUseCase {
    constructor(private userRepository: IUserRepository) { };

    async execute(data: UserLoginDto): Promise<void> {
        return this.userRepository.loginUser(data);
    }
}
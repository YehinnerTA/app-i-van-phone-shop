import { IUserRepository } from "../../domain/respositories/IUserRepository";
import { UserRegisterDto } from "../dtos/UserRegisterDto";

export class RegisterUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(userDto: UserRegisterDto): Promise<void> {
        await this.userRepository.registerUser(userDto);
    }
}
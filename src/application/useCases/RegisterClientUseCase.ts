import { IUserRepository } from "../../domain/respositories/IUserRepository";
import { ClientRegisterDto } from "../dtos/ClientRegisterDto";

export class RegisterClientUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(clienDto: ClientRegisterDto): Promise<void> {
        await this.userRepository.registerClient(clienDto);
    }
}
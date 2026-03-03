import { CreateUserDto } from "src/user/domain/dto/create-user.dto";
import { User } from "src/user/domain/entities/user_entity";
import { UserRepositoryPort } from "../ports/user.repository.port";
export declare class CreateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryPort);
    execute(dto: CreateUserDto): Promise<User>;
}

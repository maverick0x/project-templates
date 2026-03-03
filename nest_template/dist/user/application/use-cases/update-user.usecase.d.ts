import { UserRepositoryPort } from "../ports/user.repository.port";
import { UpdateUserDto } from "src/user/domain/dto/update-user.dto";
import { User } from "src/user/domain/entities/user_entity";
export declare class UpdateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryPort);
    execute(id: string, dto: UpdateUserDto): Promise<User>;
}

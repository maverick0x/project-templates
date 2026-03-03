import { UserRepositoryPort } from "../ports/user.repository.port";
import { User } from "src/user/domain/entities/user_entity";
export declare class GetUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryPort);
    execute(id: string): Promise<User>;
}

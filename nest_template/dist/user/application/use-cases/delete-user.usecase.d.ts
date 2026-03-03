import { UserRepositoryPort } from "../ports/user.repository.port";
export declare class DeleteUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryPort);
    execute(id: string): Promise<void>;
}

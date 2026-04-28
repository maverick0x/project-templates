import { UserRepositoryPort } from '../ports/user.repository.port';
export declare class ListUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryPort);
    execute(): Promise<import("../../domain/entities/user_entity").User[]>;
}

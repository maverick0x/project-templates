import { UserRepositoryPort } from "src/user/application/ports/user.repository.port";
import { User } from "src/user/domain/entities/user_entity";
export declare class InMemoryUserRepository implements UserRepositoryPort {
    private readonly users;
    save(user: User): User;
    findById(id: string): User | null;
    findByEmail(email: string): User | null;
    findAll(): User[];
    delete(id: string): void;
}

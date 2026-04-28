import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { GetUserUseCase } from '../application/use-cases/get-user.usecase';
import { ListUsersUseCase } from '../application/use-cases/list-users.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { UpdateUserDto } from '../domain/dto/update-user.dto';
export declare class UserController {
    private readonly createUserUseCase;
    private readonly getUserUseCase;
    private readonly listUsersUseCase;
    private readonly deleteUserUseCase;
    private readonly updateUserUseCase;
    constructor(createUserUseCase: CreateUserUseCase, getUserUseCase: GetUserUseCase, listUsersUseCase: ListUsersUseCase, deleteUserUseCase: DeleteUserUseCase, updateUserUseCase: UpdateUserUseCase);
    createUser(request: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        accountAge: number;
    }>;
    getUser(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        accountAge: number;
    }>;
    listUsers(): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        accountAge: number;
    }[]>;
    updateUser(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        accountAge: number;
    }>;
    deleteUser(id: string): Promise<void>;
}

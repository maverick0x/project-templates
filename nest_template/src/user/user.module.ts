import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "./application/use-cases/create-user.usecase";
import { USER_REPOSITORY } from "./application/ports/user.repository.port";
import { InMemoryUserRepository } from "./infrastructure/adapters/in-memory-user-repository";
import { UserController } from "./presentation/user.controller";
import { GetUserUseCase } from "./application/use-cases/get-user.usecase";
import { ListUsersUseCase } from "./application/use-cases/list-users.usecase";
import { DeleteUserUseCase } from "./application/use-cases/delete-user.usecase";
import { UpdateUserUseCase } from "./application/use-cases/update-user.usecase";

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    ListUsersUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository
    }
  ]
})
export class UserModule {

}
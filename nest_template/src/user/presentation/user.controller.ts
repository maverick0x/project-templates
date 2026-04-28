import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { GetUserUseCase } from '../application/use-cases/get-user.usecase';
import { ListUsersUseCase } from '../application/use-cases/list-users.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { UpdateUserDto } from '../domain/dto/update-user.dto';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  async createUser(@Body() request: CreateUserDto) {
    const user = await this.createUserUseCase.execute(request);
    return user.mapToResponse();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.getUserUseCase.execute(id);
    return user.mapToResponse();
  }

  @Get()
  async listUsers() {
    const users = await this.listUsersUseCase.execute();
    return users.map((user) => user.mapToResponse());
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.updateUserUseCase.execute(id, dto);
    return user.mapToResponse();
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.deleteUserUseCase.execute(id);
  }
}

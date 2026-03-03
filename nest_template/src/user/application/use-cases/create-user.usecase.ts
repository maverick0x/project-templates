import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/user/domain/dto/create-user.dto";
import { User } from "src/user/domain/entities/user_entity";
import { USER_REPOSITORY, UserRepositoryPort } from "../ports/user.repository.port";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort
  ) { }

  async execute(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }

    const user = User.create(dto.name, dto.email);
    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }
}
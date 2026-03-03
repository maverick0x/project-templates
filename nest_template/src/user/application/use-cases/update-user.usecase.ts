import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { USER_REPOSITORY, UserRepositoryPort } from "../ports/user.repository.port";
import { UpdateUserDto } from "src/user/domain/dto/update-user.dto";
import { User } from "src/user/domain/entities/user_entity";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) { }

  async execute(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) { throw new NotFoundException("User not found!"); }
    if (dto.name) { user.updateName(dto.name); }
    if (dto.email) { user.updateEmail(dto.email); }

    return this.userRepository.save(user);
  }
}
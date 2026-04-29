import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKycDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

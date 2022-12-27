import { IsEmail, IsOptional, IsString } from '@nestjs/class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString({
    message: 'Enter the valid username',
  })
  name: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Enter the valid email',
    },
  )
  email: string;
}

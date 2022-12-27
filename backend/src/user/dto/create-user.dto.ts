export class CreateUserDto {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
  salt: string;
}

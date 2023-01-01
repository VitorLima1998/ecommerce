export class CreateUserDto {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  telephone: number;
  cpf: number;
  address: string;
  token: string;
  salt: string;
  image: string;
}

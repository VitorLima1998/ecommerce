export class User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  telephone?: number;
  cpf?: number;
  address?: string;
  image?: string;

  constructor(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    telephone: number,
    cpf: number,
    address: string,
    image: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.telephone = telephone;
    this.cpf = cpf;
    this.address = address;
    this.image = image;
  }
}

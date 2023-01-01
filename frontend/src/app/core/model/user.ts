export class User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  image?: string;

  constructor(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    image: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.image = image;
  }
}

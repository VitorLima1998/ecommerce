import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CredentialsDto } from './dto/credentials.dto';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UserService {
  findImage(img: string) {
    return readFileSync(join(process.cwd(), `/files/${img}`));
  }
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  //-------------------------------------------------------------------------------------------------------------------
  async create(createUserDto: CreateUserDto) {
    createUserDto.token = crypto.randomBytes(32).toString('hex');
    createUserDto.salt = await bcrypt.genSalt();

    createUserDto.password = await this.hashPassword(
      createUserDto.password,
      createUserDto.salt,
    );

    try {
      await this.usersRepository.save(createUserDto);
      delete createUserDto.password;
      delete createUserDto.salt;
      return createUserDto;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('E-mail is in use');
      } else {
        throw new InternalServerErrorException('error saving user in database');
      }
    }
  }

  //-------------------------------------------------------------------------------------------------------------------

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  //-------------------------------------------------------------------------------------------------------------------

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      console.log('Impossible to fetch users');
      return null;
    }
  }

  //-------------------------------------------------------------------------------------------------------------------

  async findOne(id: string): Promise<User> {
    const user = this.usersRepository
      .createQueryBuilder('user')
      .select(['user.nome', 'user.email'])
      .getOne();
    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  //-------------------------------------------------------------------------------------------------------------------

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  //-------------------------------------------------------------------------------------------------------------------

  async update(updateUserDto: UpdateUserDto) {
    this.usersRepository.save(updateUserDto);
  }

  //-------------------------------------------------------------------------------------------------------------------

  async remove(userId: string) {
    const result = await this.usersRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }

  //-------------------------------------------------------------------------------------------------------------------

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    let user = new User();
    user = await this.findByEmail(email);

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  //-------------------------------------------------------------------------------------------------------------------
}

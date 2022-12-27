import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get(':email')
  @UseGuards(AuthGuard())
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Put()
  update(@Body() createUserDto: CreateUserDto) {
    return this.userService.update(createUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);

    return {
      message: 'User removed successfully',
    };
  }
}

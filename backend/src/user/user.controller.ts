import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

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

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    return file;
  }

  @Get('img/:fileProd')
  findImg(@Param('fileProd') img: string, @Res() response: Response) {
    const file = this.userService.findImage(img);
    response.send(file);
  }
}

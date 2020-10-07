import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const res = await this.authService.signin(email, password);
      return { result: res };
    } catch (error) {
      return error;
    }
  }

  @Post('/signup')
  async signup(@Req() request: Request) {
    try {
      const res = await this.authService.signup(request.body);
      return { result: res };
    } catch (error) {
      return error;
    }
  }
  @Post('/signup')
  @UseInterceptors(FileInterceptor('image'))
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }
}

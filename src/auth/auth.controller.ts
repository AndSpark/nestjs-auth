import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  RegisterDTO,
  LoginDTO,
  AuthResponse,
  RegisterBody,
  LoginBody,
} from '../models/user.model';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiBody({ type: RegisterBody })
  async register(
    @Body('user',ValidationPipe) credentials: RegisterDTO,
  ): Promise<AuthResponse> {
    return await this.authService.register(credentials);
  }

  @Post('/login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginBody })
  async login(
    @Body('user', ValidationPipe) credentials: LoginDTO,
  ): Promise< AuthResponse> {
    return await this.authService.login(credentials);
  }
}

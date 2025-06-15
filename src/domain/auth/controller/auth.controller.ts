import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { Public } from 'src/decorator/public.decorator';
import { TokenResponse } from '../dto/response/refresh.token.response';
import { RegisterRequest } from '../dto/request/register.request';
import { LoginRequest } from '../dto/request/login.request';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOkResponse({ description: 'User registered successfully' })
  @ApiBody({
    type: RegisterRequest,
    description: 'User registration information',
  })
  async register(@Body() request: RegisterRequest): Promise<void> {
    await this.authService.register(request);
  }

  @Public()
  @Post('login')
  @ApiOkResponse({ description: 'Login successful' })
  @ApiBody({
    type: LoginRequest,
    description: 'Login information to get access and refresh tokens',
  })
  async login(@Body() request: LoginRequest): Promise<TokenResponse> {
    return this.authService.login(request);
  }
}

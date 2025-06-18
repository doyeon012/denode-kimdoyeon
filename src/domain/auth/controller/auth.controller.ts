import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@domain/auth/service/auth.service';
import { Public } from '@decorator/public.decorator';
import { TokenResponse } from '@domain/auth/dto/response/token.response';
import { RegisterRequest } from '@domain/auth/dto/request/register.request';
import { LoginRequest } from '@domain/auth/dto/request/login.request';

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
  @ApiOkResponse({
    description: 'Login successful',
    type: TokenResponse,
  })
  @ApiBody({
    type: LoginRequest,
    description: 'Login information to get access and refresh tokens',
  })
  async login(@Body() request: LoginRequest): Promise<TokenResponse> {
    return this.authService.login(request);
  }
}

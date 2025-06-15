import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenResponse } from '../dto/response/token.response';
import { LoginRequest } from '../dto/request/login.request';
import { RegisterRequest } from '../dto/request/register.request';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersComponent } from 'src/domain/user/component/users.component';
import * as bcrypt from 'bcrypt';
import { ErrorMessageType } from 'src/enums/error.message.enum';

@Injectable()
export class AuthService {
  private static readonly ACCESS_TOKEN_TTL = '5m' as const;
  private static readonly REFRESH_TOKEN_TTL = '1day' as const;

  private readonly ACCESS_TOKEN_SECRET_KEY: string;
  private readonly REFRESH_TOKEN_SECRET_KEY: string;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userComponent: UsersComponent,
  ) {
    this.ACCESS_TOKEN_SECRET_KEY = this.configService.get('auth.ACCESS_TOKEN_SECRET_KEY') || 'default_access_secret';
    this.REFRESH_TOKEN_SECRET_KEY = this.configService.get('auth.REFRESH_TOKEN_SECRET_KEY') || 'default_refresh_secret';
  }

  public async register(request: RegisterRequest): Promise<void> {
    if (request.password !== request.confirmPassword) {
      throw new BadRequestException(ErrorMessageType.PASSWORD_MISMATCH);
    }

    const hashedPassword = await bcrypt.hash(request.password, 10);
    await this.userComponent.create({
      ...request,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
  }

  public async login(request: LoginRequest): Promise<TokenResponse> {
    const user = await this.userComponent.findByLoginId(request.loginId);
    if (!user) {
      throw new BadRequestException(ErrorMessageType.USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(request.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException(ErrorMessageType.INVALID_PASSWORD);
    }

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateAccessToken(userId: number): string {
    return this.jwtService.sign(
      { userId },
      {
        secret: this.ACCESS_TOKEN_SECRET_KEY,
        expiresIn: AuthService.ACCESS_TOKEN_TTL,
      },
    );
  }

  private generateRefreshToken(userId: number): string {
    return this.jwtService.sign(
      { userId },
      {
        secret: this.REFRESH_TOKEN_SECRET_KEY,
        expiresIn: AuthService.REFRESH_TOKEN_TTL,
      },
    );
  }
}

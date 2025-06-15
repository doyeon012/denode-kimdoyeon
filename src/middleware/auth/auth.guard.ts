import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/decorator/public.decorator';
import { ErrorMessageType } from 'src/enums/error.message.enum';

@Injectable()
export default class AuthGuard implements CanActivate {
  public static readonly ACCESS_TOKEN_HEADER = 'access-token';
  private readonly ACCESS_TOKEN_SECRET_KEY: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {
    this.ACCESS_TOKEN_SECRET_KEY = this.configService.get<string>('auth.ACCESS_TOKEN_SECRET_KEY') || 'default_access_secret';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);

    if (!accessToken) {
      throw new UnauthorizedException(ErrorMessageType.TOKEN_NOT_PROVIDED);
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.ACCESS_TOKEN_SECRET_KEY,
      });
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(ErrorMessageType.INVALID_TOKEN);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers[AuthGuard.ACCESS_TOKEN_HEADER];

    if (authHeader) {
      const [type, token] = authHeader.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
    return undefined;
  }
}

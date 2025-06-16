import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export type AuthUser = {
  id: number;
}
export const Token = createParamDecorator((data: unknown, ctx: ExecutionContext): AuthUser => {
  const request = ctx.switchToHttp().getRequest();
  console.log('request.user:', request.user);
  return request.user;
});

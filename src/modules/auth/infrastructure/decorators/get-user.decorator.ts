import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/modules/users/domain/types/jwt-payload.type';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

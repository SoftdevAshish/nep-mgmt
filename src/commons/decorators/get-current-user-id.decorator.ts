import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../routes/auth/types/JwtPayload';

export const getCurrentUserIdDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user.sub;
  },
);

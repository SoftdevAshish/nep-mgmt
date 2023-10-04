import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadRefresh } from '../../routes/auth/types/JwtPayloadRefresh';

export const GetCurrentUserDecorator = createParamDecorator(
  (data: keyof JwtPayloadRefresh | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEntity } from '../routes/role/entities/role.entity';
import { Role } from "../config/enums";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEntity[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const superAdmin = user.roles.find((role) => role.name === Role.superAdmin);
    return superAdmin
      ? true
      : user.roles.some((role) =>
          requiredRoles.some((reqRole) => role.name === reqRole),
        );
  }
}

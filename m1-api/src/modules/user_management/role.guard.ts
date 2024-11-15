// src/modules/user_management/role.guard.ts

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserManagementService } from './user_management.service';
import { UserRole } from './entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UserManagementService))
    private readonly userService: UserManagementService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.session?.userId;

    if (!userId) {
      throw new UnauthorizedException('User not logged in');
    }

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const requiredRole = this.reflector.get<UserRole>('role', context.getHandler());

    if (!requiredRole) {
      return true; // No specific role required
    }

    if (requiredRole === UserRole.AUTHOR || requiredRole === UserRole.ADMIN) {
      // Allow if user is either an AUTHOR or ADMIN
      if (user.role === UserRole.AUTHOR || user.role === UserRole.ADMIN) {
        return true;
      }
    }

    throw new ForbiddenException('You do not have the required permissions');
  }
}

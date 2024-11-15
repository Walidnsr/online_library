// src/modules/user_management/admin_management.controller.ts

import { Controller, Get, Post, Delete, Param, UseGuards, Put, Body, SetMetadata } from '@nestjs/common';
import { UserManagementService } from './user_management.service';
import { RoleGuard } from './role.guard';
import { UserRole } from './entities/user.entity';

@Controller('admin')
@UseGuards(RoleGuard)
export class AdminManagementController {
  constructor(private readonly userService: UserManagementService) {}

  @Get('users')
  @SetMetadata('role', UserRole.AUTHOR) // Allow both authors and admins to view all users
  async getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('authors')
  @SetMetadata('role', UserRole.AUTHOR) // Allow both authors and admins to view authors
  async getAllAuthors() {
    return this.userService.findAllAuthors();
  }

  @Put('user/:userId/role')
  @SetMetadata('role', UserRole.AUTHOR) // Allow both authors and admins to update user roles
  async updateUserRole(
    @Param('userId') userId: number,
    @Body('role') role: UserRole,
  ) {
    return this.userService.updateUserRole(userId, role);
  }

  @Put('user/:userId')
  @SetMetadata('role', UserRole.AUTHOR) // Allow both authors and admins to update user details
  async updateUserDetails(
    @Param('userId') userId: number,
    @Body() userDetails: Partial<{
      firstName: string;
      lastName: string;
      phoneNumber: string;
      address: string;
      bio: string;
      photoUrl: string;
    }>,
  ) {
    return this.userService.updateUserProfile(userId, userDetails);
  }

  @Delete('user/:userId')
  @SetMetadata('role', UserRole.AUTHOR) // Allow both authors and admins to delete users
  async deleteUser(@Param('userId') userId: number) {
    return this.userService.deleteUser(userId);
  }

  @Delete('author/:userId')
  @SetMetadata('role', UserRole.AUTHOR) // Allow both authors and admins to delete authors
  async deleteAuthor(@Param('userId') userId: number) {
    return this.userService.deleteAuthor(userId);
  }
}

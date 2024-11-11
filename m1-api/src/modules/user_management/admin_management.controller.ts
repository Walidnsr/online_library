// src/modules/user_management/admin_management.controller.ts

import {
    Controller,
    Get,
    Delete,
    Param,
    UseGuards,
    Put,
    Body,
    Req,
  } from '@nestjs/common';
  import { UserManagementService } from './user_management.service';
  import { Request } from 'express';
  import { RoleGuard } from './role.guard';
  import { SetMetadata } from '@nestjs/common';
  import { UserRole } from './entities/user.entity';
  
  @Controller('admin')
  @UseGuards(RoleGuard)
  export class AdminManagementController {
    constructor(private readonly userService: UserManagementService) {}
  
    // Get all users
    @Get('users')
    @SetMetadata('role', UserRole.ADMIN)
    async getAllUsers() {
      return this.userService.findAllUsers();
    }
  
    // Get all authors
    @Get('authors')
    @SetMetadata('role', UserRole.ADMIN)
    async getAllAuthors() {
      return this.userService.findAllAuthors();
    }
  
    // Update user role
    @Put('user/:userId')
    @SetMetadata('role', UserRole.ADMIN)
    async updateUserRole(
      @Param('userId') userId: number,
      @Body('role') role: UserRole,
    ) {
      await this.userService.updateUserRole(userId, role);
      return { message: 'User role updated successfully' };
    }
  
    // Delete a user
    @Delete('user/:userId')
    @SetMetadata('role', UserRole.ADMIN)
    async deleteUser(@Param('userId') userId: number) {
      await this.userService.deleteUser(userId);
      return { message: 'User deleted successfully' };
    }
  
    // Delete an author
    @Delete('author/:userId')
    @SetMetadata('role', UserRole.ADMIN)
    async deleteAuthor(@Param('userId') userId: number) {
      await this.userService.deleteAuthor(userId);
      return { message: 'Author deleted successfully' };
    }
  }
  
import {
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
  Put,
  Body,
  Req,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { UserManagementService } from './user_management.service';
import { Request } from 'express';
import { RoleGuard } from './role.guard';
import { SetMetadata } from '@nestjs/common';
import { UserRole } from './entities/user.entity';

@Controller('admin')
@UseGuards(RoleGuard)
export class AdminManagementController {
  private readonly logger = new Logger(AdminManagementController.name);

  constructor(private readonly userService: UserManagementService) {}

  // Get all users
  @Get('users')
  @SetMetadata('role', UserRole.ADMIN)
  async getAllUsers() {
    try {
      const users = await this.userService.findAllUsers();
      this.logger.log('Users fetched successfully');
      return { message: 'Users fetched successfully', data: users };
    } catch (error) {
      this.logger.error('Error fetching users', error);
      throw new HttpException(
        'Error fetching users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get all authors
  @Get('authors')
  @SetMetadata('role', UserRole.ADMIN)
  async getAllAuthors() {
    try {
      const authors = await this.userService.findAllAuthors();
      this.logger.log('Authors fetched successfully');
      return { message: 'Authors fetched successfully', data: authors };
    } catch (error) {
      this.logger.error('Error fetching authors', error);
      throw new HttpException(
        'Error fetching authors',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Update user role
  @Put('user/:userId/role')
  @SetMetadata('role', UserRole.ADMIN)
  async updateUserRole(
    @Param('userId') userId: number,
    @Body('role') role: UserRole,
  ) {
    try {
      if (!Object.values(UserRole).includes(role)) {
        throw new HttpException(
          `Invalid role provided. Allowed roles are: ${Object.values(UserRole).join(', ')}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.userService.updateUserRole(userId, role);
      this.logger.log(`User role updated successfully for userId: ${userId}`);
      return { message: 'User role updated successfully' };
    } catch (error) {
      this.logger.error('Error updating user role', error);
      if (error.status && error.status !== HttpStatus.INTERNAL_SERVER_ERROR) {
        throw error;
      }
      throw new HttpException(
        'Error updating user role',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Update user details
  @Put('user/:userId')
  @SetMetadata('role', UserRole.ADMIN)
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
    try {
      await this.userService.updateUserProfile(userId, userDetails);
      this.logger.log(`User details updated successfully for userId: ${userId}`);
      return { message: 'User details updated successfully' };
    } catch (error) {
      this.logger.error('Error updating user details', error);
      if (error.status && error.status !== HttpStatus.INTERNAL_SERVER_ERROR) {
        throw error;
      }
      throw new HttpException(
        'Error updating user details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete a user
  @Delete('user/:userId')
  @SetMetadata('role', UserRole.ADMIN)
  async deleteUser(@Param('userId') userId: number) {
    try {
      await this.userService.deleteUser(userId);
      this.logger.log(`User deleted successfully with userId: ${userId}`);
      return { message: 'User deleted successfully' };
    } catch (error) {
      this.logger.error('Error deleting user', error);
      throw new HttpException(
        'Error deleting user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete an author
  @Delete('author/:userId')
  @SetMetadata('role', UserRole.ADMIN)
  async deleteAuthor(@Param('userId') userId: number) {
    try {
      await this.userService.deleteAuthor(userId);
      this.logger.log(`Author deleted successfully with userId: ${userId}`);
      return { message: 'Author deleted successfully' };
    } catch (error) {
      this.logger.error('Error deleting author', error);
      throw new HttpException(
        'Error deleting author',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

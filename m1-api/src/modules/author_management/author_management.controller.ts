// src/modules/author_management/author_management.controller.ts

import { Controller, Post, Put, Get, Body, Param, UseGuards, Delete } from '@nestjs/common';
import { AuthorManagementService } from './author_management.service';
import { RoleGuard } from '../user_management/role.guard';
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user_management/entities/user.entity';

@Controller('authors')
export class AuthorManagementController {
  constructor(private readonly authorService: AuthorManagementService) {}

  @Post(':userId/profile')
  @UseGuards(RoleGuard)
  @SetMetadata('role', UserRole.AUTHOR) // Allow authors and admins to create profiles
  async createAuthorProfile(
    @Param('userId') userId: number,
    @Body() body: { biography: string; photoUrl?: string },
  ) {
    return this.authorService.createAuthorProfile(userId, body.biography, body.photoUrl);
  }

  @Put(':userId/profile')
  @UseGuards(RoleGuard)
  @SetMetadata('role', UserRole.AUTHOR) // Allow authors and admins to update profiles
  async updateAuthorProfile(
    @Param('userId') userId: number,
    @Body() updates: Partial<{ biography: string; photoUrl: string }>,
  ) {
    return this.authorService.updateAuthorProfile(userId, updates);
  }

  @Get() // No restriction for viewing authors
  async getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Get(':userId/profile') // Allow anyone to get a specific author profile
  async getAuthorProfile(@Param('userId') userId: number) {
    return this.authorService.getAuthorProfile(userId);
  }

  @Delete(':userId') // Allow authors to delete author profiles
  @UseGuards(RoleGuard)
  @SetMetadata('role', UserRole.AUTHOR)
  async deleteAuthorProfile(@Param('userId') userId: number) {
    return this.authorService.deleteAuthorProfile(userId);
  }
}

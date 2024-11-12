import { Controller, Post, Put, Body, Param, Req, UseGuards } from '@nestjs/common';
import { AuthorManagementService } from './author_management.service';
import { Request } from 'express';
import { RoleGuard } from '../user_management/role.guard';
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user_management/entities/user.entity';

@Controller('authors')
@UseGuards(RoleGuard)
export class AuthorManagementController {
  constructor(private readonly authorService: AuthorManagementService) {}

  @Post(':userId/profile')
  @SetMetadata('role', UserRole.AUTHOR)
  async createAuthorProfile(
    @Param('userId') userId: number,
    @Body() body: { biography: string; photoUrl?: string },
  ) {
    return this.authorService.createAuthorProfile(userId, body.biography, body.photoUrl);
  }

  @Put(':userId/profile')
  @SetMetadata('role', UserRole.AUTHOR)
  async updateAuthorProfile(
    @Param('userId') userId: number,
    @Body() updates: Partial<{ biography: string; photoUrl: string }>,
  ) {
    return this.authorService.updateAuthorProfile(userId, updates);
  }
}

// src/modules/author_management/author_management.controller.ts

import { Controller, Post, Put, Body, Param, Req } from '@nestjs/common';
import { AuthorManagementService } from './author_management.service';
import { Request } from 'express';

@Controller('authors')
export class AuthorManagementController {
  constructor(private readonly authorService: AuthorManagementService) {}

  @Post(':userId/profile')
  async createAuthorProfile(
    @Param('userId') userId: number,
    @Body() body: { biography: string; photoUrl?: string },
  ) {
    return this.authorService.createAuthorProfile(userId, body.biography, body.photoUrl);
  }

  @Put(':userId/profile')
  async updateAuthorProfile(
    @Param('userId') userId: number,
    @Body() updates: Partial<{ biography: string; photoUrl: string }>,
  ) {
    return this.authorService.updateAuthorProfile(userId, updates);
  }
}

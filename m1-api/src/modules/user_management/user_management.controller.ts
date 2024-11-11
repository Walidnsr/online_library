// src/modules/user_management/user_management.controller.ts

import { Controller, Post, Body, Get, Req, Res, Put, Param } from '@nestjs/common';
import { UserManagementService } from './user_management.service';
import { Request, Response } from 'express';

@Controller('auth')
export class UserManagementController {
  constructor(private readonly userService: UserManagementService) {}

  @Post('signup')
  async signup(
    @Body() body: { email: string; password: string; firstName: string; lastName: string; dateOfBirth?: Date }
  ) {
    return this.userService.signup(body.email, body.password, body.firstName, body.lastName, body.dateOfBirth);
  }

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const user = await this.userService.validateUser(req.body.email, req.body.password);
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    req.session.userId = user.id;
    await this.userService.updateLastLogin(user.id);
    res.send({ message: 'Logged in successfully' });
  }

  @Get('profile')
  async getProfile(@Req() req: Request) {
    if (!req.session.userId) {
      return { message: 'Unauthorized' };
    }
    return this.userService.findById(req.session.userId);
  }

  @Put('profile')
  async updateProfile(
    @Req() req: Request,
    @Body() userDetails: Partial<{ firstName: string; lastName: string; phoneNumber: string; address: string; bio: string; photoUrl: string }>
  ) {
    if (!req.session.userId) {
      return { message: 'Unauthorized' };
    }
    return this.userService.updateProfile(req.session.userId, userDetails);
  }

  @Post('favorite-book/:bookId')
  async addFavoriteBook(@Req() req: Request, @Param('bookId') bookId: number) {
    if (!req.session.userId) {
      return { message: 'Unauthorized' };
    }
    return this.userService.addFavoriteBook(req.session.userId, bookId);
  }

  @Post('unfavorite-book/:bookId')
  async removeFavoriteBook(@Req() req: Request, @Param('bookId') bookId: number) {
    if (!req.session.userId) {
      return { message: 'Unauthorized' };
    }
    return this.userService.removeFavoriteBook(req.session.userId, bookId);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send({ message: 'Could not log out' });
      }
      res.send({ message: 'Logged out successfully' });
    });
  }
}

// src/modules/author_management/author_management.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorManagementService } from './author_management.service';
import { AuthorManagementController } from './author_management.controller';
import { AuthorProfile } from './entities/author_profile.entity';
import { User } from '../user_management/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([AuthorProfile, User])],
  controllers: [AuthorManagementController],
  providers: [AuthorManagementService],
  exports: [AuthorManagementService],
})
export class AuthorManagementModule {}

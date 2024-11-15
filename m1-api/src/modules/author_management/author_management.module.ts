// src/modules/author_management/author_management.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorManagementService } from './author_management.service';
import { AuthorManagementController } from './author_management.controller';
import { AuthorProfile } from './entities/author_profile.entity';
import { UserManagementModule } from '../user_management/user_management.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorProfile]),
    forwardRef(() => UserManagementModule), // Handle circular dependency
  ],
  controllers: [AuthorManagementController],
  providers: [AuthorManagementService],
  exports: [AuthorManagementService],
})
export class AuthorManagementModule {}

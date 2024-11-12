// src/modules/user_management/user_management.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserManagementService } from './user_management.service';
import { UserManagementController } from './user_management.controller';
import { AdminManagementController } from './admin_management.controller';
import { User } from './entities/user.entity';
import { Book } from '../book_management/entities/book.entity';
import { AuthorProfile } from '../author_management/entities/author_profile.entity';
import { AuthorManagementModule } from '../author_management/author_management.module'; // Import AuthorManagementModule
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Book, AuthorProfile]),
    PassportModule.register({ defaultStrategy: 'local' }),
    forwardRef(() => AuthorManagementModule), // Use forwardRef to handle circular dependency
  ],
  controllers: [UserManagementController, AdminManagementController],
  providers: [UserManagementService, LocalStrategy],
  exports: [UserManagementService, TypeOrmModule], // Export UserManagementService and TypeOrmModule
})
export class UserManagementModule {}

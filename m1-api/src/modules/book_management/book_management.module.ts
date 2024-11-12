// src/modules/book_management/book_management.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookManagementService } from './book_management.service';
import { BookManagementController } from './book_management.controller';
import { UserManagementModule } from '../user_management/user_management.module'; // Import UserManagementModule
import { User } from '../user_management/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, User]),
    forwardRef(() => UserManagementModule), // Use forwardRef to handle circular dependency
  ],
  controllers: [BookManagementController],
  providers: [BookManagementService],
  exports: [BookManagementService],
})
export class BookManagementModule {}

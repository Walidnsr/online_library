import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookManagementController } from './book_management.controller';
import { BookManagementService } from './book_management.service';
import { Book } from './entities/book.entity';
import { User } from '../user_management/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, User]), // Register the Book and User entities with TypeOrmModule
  ],
  controllers: [BookManagementController],
  providers: [BookManagementService],
})
export class BookManagementModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewManagementService } from './review_management.service';
import { ReviewManagementController } from './review_management.controller';
import { Review } from './entities/review.entity';
import { Book } from '../book_management/entities/book.entity';
import { User } from '../user_management/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Book, User]),
  ],
  controllers: [ReviewManagementController],
  providers: [ReviewManagementService],
})
export class ReviewManagementModule {}

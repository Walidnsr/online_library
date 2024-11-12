import { Controller, Post, Put, Delete, Body, Param, Get } from '@nestjs/common';
import { ReviewManagementService } from './review_management.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewManagementController {
  constructor(private readonly reviewService: ReviewManagementService) {}

  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Put(':id')
  async updateReview(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: number) {
    return this.reviewService.deleteReview(id);
  }

  @Get('book/:bookId')
  async getReviewsByBook(@Param('bookId') bookId: number) {
    return this.reviewService.getReviewsByBook(bookId);
  }
}

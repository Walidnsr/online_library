import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Book } from '../book_management/entities/book.entity';  // Corrected path
import { User } from '../user_management/entities/user.entity'; // Corrected path

@Injectable()
export class ReviewManagementService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const { bookId, userId, ...reviewDetails } = createReviewDto;

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new Error(`Book with ID ${bookId} not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    if (book.author?.id === user.id) {
      throw new Error('Authors cannot review their own books');
    }

    const review = this.reviewRepository.create({
      ...reviewDetails,
      book,
      user,
    });

    return this.reviewRepository.save(review);
  }

  async updateReview(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new Error(`Review with ID ${id} not found`);
    }

    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  async deleteReview(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }

  async getReviewsByBook(bookId: number): Promise<Review[]> {
    return this.reviewRepository.find({ where: { book: { id: bookId } }, relations: ['user'] });
  }
}

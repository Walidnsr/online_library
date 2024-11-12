import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { User, UserRole } from '../user_management/entities/user.entity';

@Injectable()
export class BookManagementService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createBook(createBookDto: CreateBookDto, userId: number): Promise<Book> {
    const author = await this.userRepository.findOne({ where: { id: userId, role: UserRole.AUTHOR } });

    if (!author) {
      throw new Error(`Author with ID ${userId} not found or not an author`);
    }

    const book = this.bookRepository.create({
      ...createBookDto,
      author,
    });

    return this.bookRepository.save(book);
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto, userId: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id }, relations: ['author'] });
    if (!book) {
      throw new Error(`Book with ID ${id} not found`);
    }

    // Check if the user is either the author or an admin
    if (book.author?.id !== userId) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (user?.role !== UserRole.ADMIN) {
        throw new Error('You do not have permission to update this book');
      }
    }

    Object.assign(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  async getBooks(filterBookDto?: FilterBookDto): Promise<Book[]> {
    const query = this.bookRepository.createQueryBuilder('book');

    if (filterBookDto) {
      const { title, genre, publicationDate, language, format } = filterBookDto;

      if (title) {
        query.andWhere('book.title LIKE :title', { title: `%${title}%` });
      }
      if (genre) {
        query.andWhere('book.genre = :genre', { genre });
      }
      if (publicationDate) {
        query.andWhere('book.publicationDate = :publicationDate', { publicationDate });
      }
      if (language) {
        query.andWhere('book.language = :language', { language });
      }
      if (format) {
        query.andWhere('book.format = :format', { format });
      }
    }

    return query.getMany();
  }

  async getBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new Error(`Book with ID ${id} not found`);
    }
    return book;
  }

  async deleteBook(id: number, userId: number): Promise<void> {
    const book = await this.bookRepository.findOne({ where: { id }, relations: ['author'] });
    if (!book) {
      throw new Error(`Book with ID ${id} not found`);
    }

    // Check if the user is either the author or an admin
    if (book.author?.id !== userId) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (user?.role !== UserRole.ADMIN) {
        throw new Error('You do not have permission to delete this book');
      }
    }

    await this.bookRepository.delete(id);
  }
}

// src/modules/book_management/book_management.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { User, UserRole } from '../user_management/entities/user.entity';

@Injectable()
export class BookManagementService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { authorId, ...bookDetails } = createBookDto;

    const author = await this.userRepository.findOne({ where: { id: authorId, role: UserRole.AUTHOR } });

    if (!author) {
      throw new Error(`Author with ID ${authorId} not found or not an author`);
    }

    const book = this.bookRepository.create({
      ...bookDetails,
      authorId,
    });

    return this.bookRepository.save(book);
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const { authorId, ...updateDetails } = updateBookDto;

    let author = null;
    if (authorId) {
      author = await this.userRepository.findOne({ where: { id: authorId, role: UserRole.AUTHOR } });
      if (!author) {
        throw new Error(`Author with ID ${authorId} not found or not an author`);
      }
    }

    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new Error(`Book with ID ${id} not found`);
    }

    Object.assign(book, updateDetails, authorId ? { authorId } : {});
    return this.bookRepository.save(book);
  }

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async getBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new Error(`Book with ID ${id} not found`);
    }
    return book;
  }

  async deleteBook(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}

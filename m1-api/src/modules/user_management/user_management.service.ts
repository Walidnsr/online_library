// src/modules/user_management/user_management.service.ts

import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { Book } from '../book_management/entities/book.entity';
import * as bcrypt from 'bcrypt';
import { AuthorProfile } from '../author_management/entities/author_profile.entity';
import { AuthorManagementService } from '../author_management/author_management.service'; // Import AuthorManagementService

@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(AuthorProfile) private readonly authorProfileRepository: Repository<AuthorProfile>,
    @Inject(forwardRef(() => AuthorManagementService)) private readonly authorService: AuthorManagementService, // Use forwardRef to inject AuthorManagementService
  ) {}

  async signup(email: string, password: string, firstName: string, lastName: string, dateOfBirth?: Date): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword, firstName, lastName, dateOfBirth, role: UserRole.REGULAR });
    return this.userRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async findById(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId }, relations: ['favoriteBooks', 'booksPurchased', 'booksAuthored', 'authorProfile'] });
  }

  async updateProfile(userId: number, userDetails: Partial<User>): Promise<User> {
    await this.userRepository.update(userId, userDetails);
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.userRepository.update(userId, { lastLogin: new Date() });
  }

  async addFavoriteBook(userId: number, bookId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['favoriteBooks'] });
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!user || !book) {
      throw new Error('User or Book not found');
    }

    if (!user.favoriteBooks) {
      user.favoriteBooks = [];
    }

    user.favoriteBooks.push(book);
    return this.userRepository.save(user);
  }

  async removeFavoriteBook(userId: number, bookId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['favoriteBooks'] });
    if (!user) {
      throw new Error('User not found');
    }

    user.favoriteBooks = user.favoriteBooks.filter(book => book.id !== bookId);
    return this.userRepository.save(user);
  }

  // For admin to find all users
  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['favoriteBooks', 'booksPurchased', 'booksAuthored', 'authorProfile'] });
  }

  // For admin to delete a user
  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }

  // For admin to update a user's role
  async updateUserRole(userId: number, role: UserRole): Promise<User> {
    await this.userRepository.update(userId, { role });
    return this.userRepository.findOne({ where: { id: userId } });
  }

  // New method for admin to find all authors
  async findAllAuthors(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: UserRole.AUTHOR },
      relations: ['authorProfile', 'booksAuthored'],
    });
  }

  // New method for admin to delete an author
  async deleteAuthor(userId: number): Promise<void> {
    const author = await this.userRepository.findOne({ where: { id: userId, role: UserRole.AUTHOR } });

    if (!author) {
      throw new Error('Author not found');
    }

    // Delete the associated author profile if it exists
    await this.authorProfileRepository.delete({ user: { id: userId } });
    await this.userRepository.delete(userId);
  }
}

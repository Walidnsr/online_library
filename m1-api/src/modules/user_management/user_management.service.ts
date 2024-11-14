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

  // User signup with bcrypt password hashing
  async signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth?: Date
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      dateOfBirth,
      role: UserRole.REGULAR,
    });
    return this.userRepository.save(user);
  }

  // Validate user credentials during login
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // Find a user by ID with relations
  async findById(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['favoriteBooks', 'booksPurchased', 'booksAuthored', 'authorProfile'],
    });
  }

  // Update user profile details
  async updateProfile(userId: number, userDetails: Partial<User>): Promise<User> {
    await this.userRepository.update(userId, userDetails);
    return this.userRepository.findOne({ where: { id: userId } });
  }

  // Update user's last login timestamp
  async updateLastLogin(userId: number): Promise<void> {
    await this.userRepository.update(userId, { lastLogin: new Date() });
  }

  // Add a book to user's favorite list
  async addFavoriteBook(userId: number, bookId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favoriteBooks'],
    });
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

  // Remove a book from user's favorite list
  async removeFavoriteBook(userId: number, bookId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favoriteBooks'],
    });
    if (!user) {
      throw new Error('User not found');
    }

    user.favoriteBooks = user.favoriteBooks.filter((book) => book.id !== bookId);
    return this.userRepository.save(user);
  }

  // Get a list of all users for admin
  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['favoriteBooks', 'booksPurchased', 'booksAuthored', 'authorProfile'],
    });
  }

  // Delete a user for admin
  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Delete the associated author profile if the user is an author
    if (user.role === UserRole.AUTHOR) {
      await this.authorProfileRepository.delete({ user: { id: userId } });
    }

    await this.userRepository.delete(userId);
  }

  // Update a user's role for admin
  async updateUserRole(userId: number, role: UserRole): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    user.role = role;
    await this.userRepository.save(user);
    return user;
  }

  // Find all authors for admin
  async findAllAuthors(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: UserRole.AUTHOR },
      relations: ['authorProfile', 'booksAuthored'],
    });
  }

  // Delete an author and their associated profile for admin
  async deleteAuthor(userId: number): Promise<void> {
    const author = await this.userRepository.findOne({
      where: { id: userId, role: UserRole.AUTHOR },
    });

    if (!author) {
      throw new Error('Author not found');
    }

    // Delete the associated author profile
    await this.authorProfileRepository.delete({ user: { id: userId } });

    await this.userRepository.delete(userId);
  }

  // Update user details for admin
  async updateUserProfile(userId: number, userDetails: Partial<User>): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, userDetails);
    await this.userRepository.save(user);
  }
}

// src/modules/author_management/author_management.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorProfile } from './entities/author_profile.entity';
import { User, UserRole } from '../user_management/entities/user.entity';

@Injectable()
export class AuthorManagementService {
  constructor(
    @InjectRepository(AuthorProfile)
    private readonly authorProfileRepository: Repository<AuthorProfile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createAuthorProfile(userId: number, biography: string, photoUrl?: string): Promise<AuthorProfile> {
    const user = await this.userRepository.findOne({ where: { id: userId, role: UserRole.AUTHOR } });
    if (!user) {
      throw new Error('User not found or not an author');
    }

    const authorProfile = this.authorProfileRepository.create({
      user,
      biography,
      photoUrl,
      numberOfBooks: 0,
      averageBookRating: 0.0,
    });

    return this.authorProfileRepository.save(authorProfile);
  }

  async updateAuthorProfile(userId: number, updates: Partial<AuthorProfile>): Promise<AuthorProfile> {
    const authorProfile = await this.authorProfileRepository.findOne({ where: { user: { id: userId } } });
    if (!authorProfile) {
      throw new Error('Author profile not found');
    }

    Object.assign(authorProfile, updates);
    return this.authorProfileRepository.save(authorProfile);
  }

  // Additional method to update number of books or average rating
  async updateAuthorMetrics(userId: number, bookCount: number, averageRating: number): Promise<AuthorProfile> {
    const authorProfile = await this.authorProfileRepository.findOne({ where: { user: { id: userId } } });
    if (!authorProfile) {
      throw new Error('Author profile not found');
    }

    authorProfile.numberOfBooks = bookCount;
    authorProfile.averageBookRating = averageRating;

    return this.authorProfileRepository.save(authorProfile);
  }
}

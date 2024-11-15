// src/modules/author_management/author_management.service.ts

import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorProfile } from './entities/author_profile.entity';
import { User, UserRole } from '../user_management/entities/user.entity';

@Injectable()
export class AuthorManagementService {
  private readonly logger = new Logger(AuthorManagementService.name);

  constructor(
    @InjectRepository(AuthorProfile)
    private readonly authorProfileRepository: Repository<AuthorProfile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createAuthorProfile(userId: number, biography: string, photoUrl?: string): Promise<AuthorProfile> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId, role: UserRole.AUTHOR } });
      if (!user) {
        this.logger.error(`User with ID ${userId} not found or not an author`);
        throw new NotFoundException('User not found or not an author');
      }

      const authorProfile = this.authorProfileRepository.create({
        user,
        biography,
        photoUrl,
        numberOfBooks: 0,
        averageBookRating: 0.0,
      });

      return await this.authorProfileRepository.save(authorProfile);
    } catch (error) {
      this.logger.error(`Failed to create author profile for userId ${userId}`, error);
      throw new InternalServerErrorException('Failed to create author profile');
    }
  }

  async updateAuthorProfile(userId: number, updates: Partial<AuthorProfile>): Promise<AuthorProfile> {
    try {
      const authorProfile = await this.authorProfileRepository.findOne({ where: { user: { id: userId } } });
      if (!authorProfile) {
        this.logger.error(`Author profile for userId ${userId} not found`);
        throw new NotFoundException('Author profile not found');
      }

      Object.assign(authorProfile, updates);
      return await this.authorProfileRepository.save(authorProfile);
    } catch (error) {
      this.logger.error(`Failed to update author profile for userId ${userId}`, error);
      throw new InternalServerErrorException('Failed to update author profile');
    }
  }

  async getAllAuthors(): Promise<AuthorProfile[]> {
    try {
      return await this.authorProfileRepository.find({ relations: ['user'] });
    } catch (error) {
      this.logger.error('Failed to get all authors', error);
      throw new InternalServerErrorException('Failed to get all authors');
    }
  }

  async getAuthorProfile(userId: number): Promise<AuthorProfile> {
    try {
      this.logger.log(`Fetching author profile for userId ${userId}`);
      const authorProfile = await this.authorProfileRepository.findOne({
        where: { user: { id: userId } },
        relations: ['user'],
      });

      if (!authorProfile) {
        this.logger.error(`Author profile for userId ${userId} not found`);
        throw new NotFoundException('Author profile not found');
      }

      this.logger.log(`Successfully fetched author profile for userId ${userId}`);
      return authorProfile;
    } catch (error) {
      this.logger.error(`Failed to get author profile for userId ${userId}`, error);
      throw new InternalServerErrorException('Failed to get author profile');
    }
  }

  // Adding the deleteAuthorProfile method
  async deleteAuthorProfile(userId: number): Promise<void> {
    try {
      const authorProfile = await this.authorProfileRepository.findOne({ where: { user: { id: userId } } });
      if (!authorProfile) {
        this.logger.error(`Author profile for userId ${userId} not found`);
        throw new NotFoundException('Author profile not found');
      }

      await this.authorProfileRepository.remove(authorProfile);
      this.logger.log(`Author profile for userId ${userId} deleted successfully`);
    } catch (error) {
      this.logger.error(`Failed to delete author profile for userId ${userId}`, error);
      throw new InternalServerErrorException('Failed to delete author profile');
    }
  }
}

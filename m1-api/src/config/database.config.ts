import { DataSource } from 'typeorm';
import { User } from '../modules/user_management/entities/user.entity';
import { Book } from '../modules/book_management/entities/book.entity';
import { AuthorProfile } from '../modules/author_management/entities/author_profile.entity';
import { Review } from '../modules/review_managemnt/entities/review.entity'; // Import Review entity

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false, // Set to true only during development, not in production
  logging: true,
  entities: [User, Book, AuthorProfile, Review], // Added Review entity to the list
  migrations: ['src/migrations/*.ts'],
});

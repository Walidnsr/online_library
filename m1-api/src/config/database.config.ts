import { DataSource } from 'typeorm';
import { User } from '../modules/user_management/entities/user.entity';
import { Book } from '../modules/book_management/entities/book.entity';
import { AuthorProfile } from '../modules/author_management/entities/author_profile.entity';
// Add any other entities here

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [User, Book, AuthorProfile],
  migrations: ['src/migrations/*.ts'],
});

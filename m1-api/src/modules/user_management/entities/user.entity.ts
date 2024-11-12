import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Book } from '../../book_management/entities/book.entity';
import { AuthorProfile } from '../../author_management/entities/author_profile.entity';
import { Review } from '../../review_managemnt/entities/review.entity';

export enum UserRole {
  REGULAR = 'regular',
  AUTHOR = 'author',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.REGULAR })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  photoUrl: string;

  @ManyToMany(() => Book)
  @JoinTable()
  favoriteBooks: Book[];

  @ManyToMany(() => Book)
  @JoinTable()
  booksPurchased: Book[];

  @OneToMany(() => Book, (book) => book.author, { nullable: true })
  booksAuthored: Book[];

  @OneToMany(() => Review, (review) => review.user, { nullable: true })
  reviews?: Review[];

  @OneToOne(() => AuthorProfile, (authorProfile) => authorProfile.user)
  authorProfile: AuthorProfile;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

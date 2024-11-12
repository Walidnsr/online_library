import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user_management/entities/user.entity';
import { Review } from '../../review_managemnt/entities/review.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  publicationDate!: Date;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  price!: number;

  @Column()
  genre!: string;

  @Column()
  language!: string;

  @Column({ type: 'text' })
  summary!: string;

  @Column({ nullable: true })
  coverImageUrl?: string;

  @Column()
  pageCount!: number;

  @Column()
  format!: string;

  @Column({ default: 1 })
  availableCopies!: number;

  @Column({ nullable: true })
  publisher?: string;

  @Column('simple-array', { nullable: true })
  tags?: string[];

  @ManyToOne(() => User, (user) => user.booksAuthored, { nullable: true, onDelete: 'SET NULL' })
  author?: User;

  @OneToMany(() => Review, (review: Review) => review.book, { nullable: true })
  reviews?: Review[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

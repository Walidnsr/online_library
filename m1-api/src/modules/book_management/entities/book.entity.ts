// src/modules/book_management/entities/book.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user_management/entities/user.entity';

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

  @Column({ nullable: true })  // Make authorId nullable
  authorId?: number;

  @ManyToOne(() => User, (user) => user.booksAuthored, { nullable: true, onDelete: 'SET NULL' })
  author?: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

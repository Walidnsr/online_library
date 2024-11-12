import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { Book } from '../../book_management/entities/book.entity';
  import { User } from '../../user_management/entities/user.entity';
  
  @Entity('reviews')
  export class Review {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: 'int', width: 1 })
    rating!: number;
  
    @Column({ type: 'text', nullable: true })
    comment?: string;
  
    @ManyToOne(() => Book, (book) => book.reviews, { onDelete: 'CASCADE' })
    book!: Book;
  
    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    user!: User;
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  }
  
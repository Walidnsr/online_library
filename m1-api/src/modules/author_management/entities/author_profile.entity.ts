// src/modules/author_management/entities/author_profile.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user_management/entities/user.entity';

@Entity()
export class AuthorProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  biography: string;

  @Column({ nullable: true })
  photoUrl: string;

  // Add any other author-specific fields here
}

// src/modules/book_management/dto/create-book.dto.ts

import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  publicationDate!: Date;

  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @IsNotEmpty()
  @IsNumber()
  authorId!: number; // This field will now be used to fetch the User entity that is the author
}

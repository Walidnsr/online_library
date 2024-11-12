import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDate()
  publicationDate?: Date;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  authorId?: number; // Placeholder for author association
}

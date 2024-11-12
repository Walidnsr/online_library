import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
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
  @IsString()
  genre!: string;

  @IsNotEmpty()
  @IsString()
  language!: string;

  @IsNotEmpty()
  @IsString()
  summary!: string;

  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  pageCount!: number;

  @IsNotEmpty()
  @IsString()
  format!: string;

  @IsOptional()
  @IsNumber()
  availableCopies?: number;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];
}

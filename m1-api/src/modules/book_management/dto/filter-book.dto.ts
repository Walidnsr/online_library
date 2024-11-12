import { IsOptional, IsString, IsDate } from 'class-validator';

export class FilterBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsDate()
  publicationDate?: Date;
}

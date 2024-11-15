import { Controller, Post, Body, Get, Param, Put, Delete, Req, Query } from '@nestjs/common';
import { BookManagementService } from './book_management.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { Request } from 'express';

@Controller('books')
export class BookManagementController {
  constructor(private readonly bookService: BookManagementService) {}

  @Post()
  async createBook(@Req() req: Request, @Body() createBookDto: CreateBookDto) {
    const userId = req.session.userId;
    return this.bookService.createBook(createBookDto, userId);
  }

  @Get()
  async getBooks(@Query() filterBookDto: FilterBookDto) {
    return this.bookService.getBooks(filterBookDto);
  }

  @Get(':id')
  async getBookById(@Param('id') id: number) {
    return this.bookService.getBookById(id);
  }

  @Put(':id')
  async updateBook(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto, @Req() req: Request) {
    const userId = req.session.userId;
    return this.bookService.updateBook(id, updateBookDto, userId);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number, @Req() req: Request) {
    const userId = req.session.userId;
    return this.bookService.deleteBook(id, userId);
  }
}

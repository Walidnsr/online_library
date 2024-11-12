// book_management controller


import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { BookManagementService } from './book_management.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookManagementController {
  constructor(private readonly bookService: BookManagementService) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @Get()
  async getBooks() {
    return this.bookService.getBooks();
  }

  @Get(':id')
  async getBookById(@Param('id') id: number) {
    return this.bookService.getBookById(id);
  }

  @Put(':id')
  async updateBook(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBook(id);
  }
}

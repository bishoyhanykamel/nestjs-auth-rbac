import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService
  ) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getBookById(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.getBookById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AccessTokenGuard)
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  updateBookById(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBookById(id, updateBookDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  deleteBookById(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.deleteBookById(id);
  }
}

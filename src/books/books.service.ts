import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>
  ) { }

  async getAllBooks() {
    let books = undefined;
    try {
      books = await this.bookRepo.find();
    } catch (err) {
      throw new InternalServerErrorException('Connection to database failed.');
    }

    if (books == undefined)
      throw new InternalServerErrorException('Could not load books.');

    return books;
  }

  async getBookById(id: number) {
    let book = undefined;

    try {
      book = await this.bookRepo.find({
        where: {
          id
        }
      });
    } catch (err) {
      throw new InternalServerErrorException('Could not connect to the database.');
    }

    if (book == undefined)
      throw new InternalServerErrorException('Could not load book.');

    if (book.length <= 0)
      throw new NotFoundException(`Book does not exist.`);

    return book[0];
  }

  async createBook(createBookDto: CreateBookDto) {
    let createdBook = undefined;
    try {
      createdBook = this.bookRepo.create(createBookDto);
    }
    catch (err) {
      throw new InternalServerErrorException('Could not communicate with database');
    }
    if (createdBook == undefined)
      throw new InternalServerErrorException('Could not create book.');

    return await this.bookRepo.save(createdBook);
  }

  async updateBookById(id: number, updateBookDto: UpdateBookDto) {
    let existingBook = undefined;

    try {
      existingBook = await this.bookRepo.find({
        where: {
          id
        }
      });
    } catch (err) {
      throw new InternalServerErrorException('Could not connect to the database.');
    }

    if (existingBook == undefined)
      throw new InternalServerErrorException('Could not load an existing book.');

    if (existingBook.length <= 0)
      throw new BadRequestException('Book does not exist');

    return await this.bookRepo.update({ id }, updateBookDto);
  }

  async deleteBookById(id: number) {
    let existingBook = undefined;

    try {
      existingBook = await this.bookRepo.find({
        where: {
          id
        }
      });
    } catch (err) {
      throw new InternalServerErrorException('Could not connect to the database.');
    }

    if (existingBook == undefined)
      throw new InternalServerErrorException('Could not load an existing book.');

    if (existingBook.length <= 0)
      throw new BadRequestException('Book does not exist');

    return await this.bookRepo.delete(id);
  }
}

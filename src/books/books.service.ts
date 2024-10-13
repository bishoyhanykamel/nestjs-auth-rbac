import { BadRequestException, Injectable } from '@nestjs/common';
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
    return await this.bookRepo.find();
  }

  async getBookById(id: number) {
    return await this.bookRepo.find({
      where: {
        id
      }
    })
  }

  async createBook(createBookDto: CreateBookDto) {
    const createdBook = this.bookRepo.create(createBookDto);
    return await this.bookRepo.save(createdBook);
  }

  async updateBookById(id: number, updateBookDto: UpdateBookDto) {
    const existingBook = await this.bookRepo.find({
      where: {
        id
      }
    });

    if (existingBook.length <= 0)
      throw new BadRequestException('Book does not exist');

    return await this.bookRepo.update({ id }, { ...existingBook, ...updateBookDto });
  }

  async deleteBookById(id: number) {
    const existingBook = await this.bookRepo.find({
      where: {
        id
      }
    });

    if (existingBook.length <= 0)
      throw new BadRequestException('Book does not exist');

    return await this.bookRepo.delete(id);
  }
}

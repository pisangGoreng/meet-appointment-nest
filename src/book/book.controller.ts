import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import * as moment from 'moment';

import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get(':subject')
  @HttpCode(HttpStatus.OK)
  async getAll(@Param('subject') subject: string = 'love'): Promise<any> {
    const books = await this.bookService.getBooksBySubject(subject);
    if (books.works.length === 0) {
      throw new BadRequestException('Unknow subject');
    }

    const transformBooks = await this.bookService.modifyBooks(books.works);
    const dateTimeNow = moment().format('YYYY-MM-DD').toString();

    return {
      date_now: dateTimeNow,
      subject,
      books: transformBooks,
    };
  }
}

import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query('page') page = 1): Promise<any> {
    // const [users, usersErr] = await this.userService.findAll();
    // console.log('SEBETULYNA MASUK ENGK C????? ', users);
    // if (usersErr) throw new BadRequestException(usersErr);
    // return users;

    return this.bookService.getBooksBySubject('love');
  }
}

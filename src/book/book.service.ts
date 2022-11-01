import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { BookRepository } from './book.repository';
import { In } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    private readonly httpService: HttpService,
    private readonly bookRepository: BookRepository,
  ) {}

  async getBooksBySubject(subject: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${process.env.BASE_URL_LIBRARY}/${subject}.json`)
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  modifyBooks(books) {
    const modifiedBooks = [];
    books.forEach((book) => {
      const { authors, key, availability, title, cover_edition_key } = book;
      modifiedBooks.push({
        title,
        key,
        edition_number: cover_edition_key,
        is_available_to_borrow: availability
          ? availability.available_to_borrow
          : false,
        author: authors.map((author) => ({ name: author.name })),
      });
    });

    return modifiedBooks;
  }

  async all({ booksDetails }) {
    console.log(
      '🚀 ~ file: book.service.ts ~ line 48 ~ BookService ~ all ~ bookDetails',
      booksDetails,
    );

    const where = {
      title: In(booksDetails.map((book) => book.title)),
    };

    return this.bookRepository.all([], where);
  }

  bulkCreate({ booksDetails }) {
    return this.bookRepository.bulkCreate({ booksDetails });
  }
}

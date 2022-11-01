import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstact.repository';

import { Connection, Repository } from 'typeorm';
import { Book } from './models/book.entity';

@Injectable()
export class BookRepository extends AbstractRepository {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    connection: Connection,
  ) {
    super(bookRepository, connection);
  }

  async bulkCreate({ booksDetails }) {
    const results = [null, null];

    try {
      results[0] = await this.bookRepository
        .createQueryBuilder('book')
        .insert()
        .into(Book)
        .values(booksDetails[0])
        .execute();
    } catch (error) {
      console.error(error);
      results[1] = error.driverError.sqlMessage;
    }

    return results;
  }
}

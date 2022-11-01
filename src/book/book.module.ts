import { HttpModule } from '@nestjs/axios';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';
import { Book } from './models/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), HttpModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
  exports: [BookService],
})
export class BookModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentBooksDetailsRepository } from './appointment-books-details.repository';
import { AppointmentBooksDetailsService } from './appointment-books-details.service';
import { AppointmentBooksDetails } from './models/AppointmentBooksDetails.entity';
@Module({
  imports: [TypeOrmModule.forFeature([AppointmentBooksDetails])],
  providers: [
    AppointmentBooksDetailsService,
    AppointmentBooksDetailsRepository,
  ],
  exports: [AppointmentBooksDetailsService],
})
export class AppointmentBooksDetailsModule {}

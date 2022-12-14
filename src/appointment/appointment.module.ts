import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentService } from './appointment.service';
import { Appointment } from './models/appointment.entity';

import { UserModule } from 'src/user/user.module';
import { BookModule } from 'src/book/book.module';
import { AppointmentBooksDetailsModule } from 'src/appointment-books-details/appointment-books-details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    UserModule,
    BookModule,
    AppointmentBooksDetailsModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository],
})
export class AppointmentModule {}

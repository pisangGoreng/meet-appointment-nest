import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import * as moment from 'moment';
import { BookService } from 'src/book/book.service';
import { UserService } from 'src/user/user.service';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './models/create-appointment-dto';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<any> {
    return { status: true };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateAppointmentDto): Promise<any> {
    const { name, phone_number, appointment_date, books_title } = body;

    const userDetails = { name, phone_number };
    let storedUserDetails = null;

    const [user, userErr] = await this.userService.findUser({ userDetails });
    if (userErr) throw new BadRequestException(userErr);
    storedUserDetails = user;

    const isUnregisterUser = user === null;
    if (isUnregisterUser) {
      const [newUser, newUserErr] = await this.userService.create({
        userDetails,
      });
      if (newUserErr) throw new BadRequestException(newUserErr);
      storedUserDetails = newUser;
    }

    const [saveBooks, saveBooksErr] = await this.bookService.bulkCreate({
      booksDetails: books_title,
    });
    if (saveBooksErr) throw new BadRequestException(saveBooksErr);

    const [appointment, appointmentErr] = await this.appointmentService.create({
      appointmentDetails: {
        user_id: storedUserDetails.id,
        appointment_date,
      },
    });
    if (appointmentErr) throw new BadRequestException(appointmentErr);

    return { appointment, storedUserDetails, saveBooks };
  }
}

// const [books, bookErr] = await this.bookService.all({
//   booksDetails: books_title,
// });
// if (bookErr) throw new BadRequestException(bookErr);
// const storedBooks = await this.bookService.

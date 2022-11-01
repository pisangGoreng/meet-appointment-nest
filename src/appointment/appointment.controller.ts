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
import { AppointmentBooksDetailsService } from 'src/appointment-books-details/appointment-books-details.service';
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
    private readonly appointmentBooksDetails: AppointmentBooksDetailsService,
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

    // ! HANDLE USER
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

    // ! HANDLE BOOK
    const [saveBooks, saveBooksErr] = await this.bookService.bulkCreate({
      booksDetails: books_title,
    });
    if (saveBooksErr) throw new BadRequestException(saveBooksErr);

    // ! HANDLE APPOINTMENT
    const [appointment, appointmentErr] = await this.appointmentService.create({
      appointmentDetails: {
        user_id: storedUserDetails.id,
        appointment_date,
      },
    });
    if (appointmentErr) throw new BadRequestException(appointmentErr);

    // ! HANDLE APPOINTMENT BOOK DETAILS
    const [appointmentBookDetails, appointmentBookDetailsErr] =
      await this.appointmentBooksDetails.bulkCreate(appointment, saveBooks);
    if (appointmentBookDetailsErr)
      throw new BadRequestException(appointmentBookDetailsErr);

    return { appointmentBookDetails };
  }
}

import { Injectable } from '@nestjs/common';
import { AppointmentBooksDetailsRepository } from './appointment-books-details.repository';

@Injectable()
export class AppointmentBooksDetailsService {
  constructor(
    private readonly appointmentBookDetailsRepository: AppointmentBooksDetailsRepository,
  ) {}

  async bulkCreate(appointments, books) {
    const appointmentBooks = books.identifiers.map((book) => {
      return {
        appointment_id: appointments.id,
        book_id: book.id,
      };
    });

    return this.appointmentBookDetailsRepository.bulkCreate({
      appointmentBooks,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AppointmentRepository } from './appointment.repository';

@Injectable()
export class AppointmentService {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private userService: UserService,
  ) {}

  async create({ appointmentDetails }) {
    return await this.appointmentRepository.create(appointmentDetails);
  }
}

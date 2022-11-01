import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstact.repository';

import { Connection, Repository } from 'typeorm';
import { Appointment } from './models/appointment.entity';

@Injectable()
export class AppointmentRepository extends AbstractRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    connection: Connection,
  ) {
    super(appointmentRepository, connection);
  }
}

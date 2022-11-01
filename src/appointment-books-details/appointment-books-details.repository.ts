import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstact.repository';

import { Connection, Repository } from 'typeorm';
import { AppointmentBooksDetails } from './models/AppointmentBooksDetails.entity';

@Injectable()
export class AppointmentBooksDetailsRepository extends AbstractRepository {
  constructor(
    @InjectRepository(AppointmentBooksDetails)
    private readonly appointmentBooksDetails: Repository<AppointmentBooksDetails>,
    connection: Connection,
  ) {
    super(appointmentBooksDetails, connection);
  }

  async bulkCreate({ appointmentBooks }) {
    const results = [null, null];

    try {
      results[0] = await this.appointmentBooksDetails
        .createQueryBuilder('appointmentBooksDetails')
        .insert()
        .into(AppointmentBooksDetails)
        .values(appointmentBooks)
        .execute();
    } catch (error) {
      console.error(error);
      results[1] = error.driverError.sqlMessage;
    }

    return results;
  }
}

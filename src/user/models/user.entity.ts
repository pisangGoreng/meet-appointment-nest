import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Appointment } from 'src/appointment/models/appointment.entity';

@Entity('users')
@Index(['name', 'phone_number'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone_number: string;

  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  // ! RELATIONS TABLE
  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointment: Appointment[];
}

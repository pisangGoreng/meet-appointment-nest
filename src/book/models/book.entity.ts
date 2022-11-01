import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Appointment } from 'src/appointment/models/appointment.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  key: string;

  @Column()
  edition_number: string;

  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  // @ManyToMany(() => Subject, (subject) => subject.teachers)
  // subjects: Subject[];

  // @ManyToMany(() => Appointment)
  // @JoinTable({
  //   name: 'appointment_books_details',
  //   joinColumn: { name: 'book_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'appointment_id', referencedColumnName: 'id' },
  // })
  // appointments: Appointment[];
}

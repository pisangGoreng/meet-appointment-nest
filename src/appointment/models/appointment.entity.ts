import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/models/user.entity';
import { Book } from 'src/book/models/book.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  appointment_date: string;

  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  // ! RELATIONS TABLE
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @ManyToMany(() => Book)
  // @JoinTable({
  //   name: 'appointment_books_details',
  //   joinColumn: { name: 'appointment_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'book_id', referencedColumnName: 'id' },
  // })
  // books: Book[];
}

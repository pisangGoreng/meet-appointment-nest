import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class BooksTitleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  key: string;
}

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  appointment_date: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => BooksTitleDto)
  books_title: BooksTitleDto[];
}

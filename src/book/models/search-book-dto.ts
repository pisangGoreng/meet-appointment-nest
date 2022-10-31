import { IsNotEmpty, IsString } from 'class-validator';

export class SearchBookDto {
  @IsNotEmpty()
  @IsString()
  subject: string;
}

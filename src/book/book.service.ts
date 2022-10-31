import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class BookService {
  constructor(private readonly httpService: HttpService) {}

  async getBooksBySubject(subject: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `http://openlibrary.org/subjects/${subject}.json?published_in=1500-1600`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}

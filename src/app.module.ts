import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// !
import { BookModule } from './book/book.module';
import { CommonModule } from './common/common.module';

const isEnable = ['dev', 'dev-local'].includes(process.env.NODE_ENV);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: isEnable,
    }),
    BookModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

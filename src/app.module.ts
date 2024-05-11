// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileEntity } from './file/entities/file.entity';
import { FilesController } from './file/file.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fileUpload',
      entities: [FileEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([FileEntity]),
  ],
  controllers: [AppController,FilesController],
  providers: [AppService],
})
export class AppModule {}


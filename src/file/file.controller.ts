// files/files.controller.ts

import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';


@Controller('files')
export class FilesController {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const filePath = join(__dirname, '..', '..', 'uploads', file.originalname);
    const writeStream = createWriteStream(filePath);
    writeStream.write(file.buffer);
    const fileEntity = new FileEntity();
    fileEntity.originalName = file.originalname;
    fileEntity.filePath = filePath;
    await this.fileRepository.save(fileEntity);

    return { message: 'File uploaded successfully' };
  }
}

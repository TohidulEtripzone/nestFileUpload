import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FilesController } from './file.controller';


@Module({
  controllers: [FilesController],
  providers: [FileService],
})
export class FileModule {}

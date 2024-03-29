import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from 'src/controller/file.controller';
import { FileExtensionController } from 'src/controller/file.extension.controller';
import { FileExtension } from 'src/model/dao/file.extension.entity';
import { FileExtensionService } from 'src/service/file.extension.service';
import { FileService } from 'src/service/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileExtension])],
  controllers: [FileExtensionController, FileController],
  providers: [FileExtensionService, FileService],
})
export class FileExtensionModule {}

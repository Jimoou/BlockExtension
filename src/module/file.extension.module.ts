import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from 'src/controller/file.controller';
import { FileExtensionController } from 'src/controller/file.extension.controller';
import { FileExtension } from 'src/model/dao/file.extension.entity';
import { FileExtensionService } from 'src/service/file.extension.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileExtension])],
  controllers: [FileExtensionController, FileController],
  providers: [FileExtensionService],
})
export class FileExtensionModule {}

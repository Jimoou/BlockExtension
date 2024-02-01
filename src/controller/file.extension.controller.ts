import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateExtensionDto } from 'src/model/dto/create-extension.dto';
import { UpdateExtensionDto } from 'src/model/dto/update-extension.dto';
import { FileExtensionService } from 'src/service/file.extension.service';

@Controller('file-extension')
export class FileExtensionController {
  constructor(private fileExtensionService: FileExtensionService) {}

  @Post()
  createCustomExtension(@Body() body: CreateExtensionDto) {
    return this.fileExtensionService.create(body);
  }

  @Get()
  findAllExtensions() {
    return this.fileExtensionService.findAll();
  }

  @Put()
  updateExtension(@Body() body: UpdateExtensionDto) {
    return this.fileExtensionService.update(body);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.fileExtensionService.delete(id);
  }
}

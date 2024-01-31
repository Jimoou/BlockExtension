import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileExtension } from 'src/model/dao/file.extension.entity';
import { CreateExtensionDto } from 'src/model/dto/create-extension.dto';
import { UpdateExtensionDto } from 'src/model/dto/update-extension.dto';
import { Repository } from 'typeorm';

@Injectable()
export class FileExtensionService {
  constructor(@InjectRepository(FileExtension) private extensions: Repository<FileExtension>) {}

  async create(extDto: CreateExtensionDto) {
    const existingExtension = await this.extensions.findOneBy({ name: extDto.name });
    const customExtensionCount = await this.extensions.count({
      where: { status: 'custom' },
    });
    if (existingExtension) {
      throw new ConflictException('중복된 확장자명입니다.');
    } else if (customExtensionCount > 200) {
      throw new BadRequestException('커스텀 확장자는 200개 까지 생성 가능합니다.');
    }
    const extension = this.extensions.create(extDto);
    await this.extensions.save(extension);
    return { statusCode: HttpStatus.CREATED, message: '생성되었습니다.' };
  }

  findAll() {
    return this.extensions.find();
  }

  async update(extDto: UpdateExtensionDto) {
    const extension = await this.extensions.findOneBy({ id: extDto.id });
    if (!extension) {
      throw new NotFoundException(`해당 ${extDto.id}를 찾을 수 없습니다.`);
    }
    await this.extensions.save({ ...extension, ...extDto });
    return { statusCode: HttpStatus.OK, message: '업데이트 되었습니다.' };
  }

  async delete(id: string) {
    const extension = await this.extensions.findOne({ where: { id: id, status: 'custom' } });
    if (!extension) {
      throw new NotFoundException(`해당 ${id}를 찾을 수 없습니다.`);
    }
    await this.extensions.remove(extension);
    return { statusCode: HttpStatus.OK, message: '삭제 되었습니다.' };
  }
}

import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileExtension } from 'src/model/dao/file.extension.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(@InjectRepository(FileExtension) private readonly extensions: Repository<FileExtension>) {}

  async uploadFile(file: Express.Multer.File): Promise<any> {
    const parts = file.originalname.split('.');
    const fileName = parts[parts.length - 1].toLowerCase();
    const blockedExtensions = await this.extensions.find({ where: { block: true } });
    const isBlocked = blockedExtensions.some((blockedExt) => blockedExt.name === fileName);

    if (isBlocked) {
      throw new BadRequestException('업로드된 파일의 확장자가 차단되었습니다.');
    }

    return { statusCode: HttpStatus.OK, message: '첨부되었습니다.' };
  }
}

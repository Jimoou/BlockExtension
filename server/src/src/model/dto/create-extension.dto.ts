import { IsBoolean, IsIn, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateExtensionDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 20, { message: '확장자명 길이는 1자 이상 20자 이하여야 합니다.' })
  name: string;

  @IsString()
  @IsIn(['custom'])
  status: string;

  @IsBoolean()
  block: boolean;
}

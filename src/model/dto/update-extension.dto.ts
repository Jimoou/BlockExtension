import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateExtensionDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsBoolean()
  block: boolean;
}

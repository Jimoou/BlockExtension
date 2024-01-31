import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateExtensionDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  status: string;
  @IsBoolean()
  block: boolean;
}

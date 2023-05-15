import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CompanyCreateDto {
  userId: number;

  @ApiProperty({ example: 'ООО РОГА И КОПЫТА' })
  @IsString()
  name: string;
}

export class CompanyUpdateDto {
  userId: number;

  @ApiProperty({ example: 'ООО РОГА И КОПЫТА' })
  @IsString()
  name: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserResumeCreateDto {
  userId: number;

  @ApiProperty({ example: 'RF' })
  @IsString()
  citizenship: string;

  @ApiProperty({ example: 160.2 })
  @IsNumber()
  height: number;

  @ApiProperty({ example: 160.2 })
  @IsNumber()
  weight: number;

  @ApiProperty({ example: 22 })
  @IsNumber()
  age: number;

  @ApiProperty({ type: 'Description' })
  @IsString()
  description: string;
}

export class UserResumeUpdateDto {
  id: number;
  userId: number;

  @ApiProperty({ example: 'RF' })
  @IsString()
  citizenship: string;

  @ApiProperty({ example: 160.2 })
  @IsNumber()
  height: number;

  @ApiProperty({ example: 160.2 })
  @IsNumber()
  weight: number;

  @ApiProperty({ example: 22 })
  @IsNumber()
  age: number;

  @ApiProperty({ type: 'Description' })
  @IsString()
  description: string;
}

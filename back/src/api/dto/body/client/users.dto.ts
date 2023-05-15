import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserUpdateDto {
  id: number;

  @ApiProperty({ example: 'email@email.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'daniil' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'evteev' })
  @IsString()
  surname: string;
}

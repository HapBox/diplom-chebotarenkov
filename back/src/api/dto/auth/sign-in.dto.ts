import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SystemRoleEnum } from 'src/api/utils/constants';

export class SignInDto {
  systemRole: SystemRoleEnum;

  @ApiProperty({ example: 'dotalover@valve.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'VeryHardPass123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpDto {
  @ApiProperty({ example: Object.values(SystemRoleEnum).join('/') })
  @IsEnum(SystemRoleEnum)
  systemRole: SystemRoleEnum;

  @ApiProperty({ example: 'dotalover@valve.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'VeryHardPass123' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'Danya' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Chebotarenkov' })
  @IsString()
  surname: string;
}
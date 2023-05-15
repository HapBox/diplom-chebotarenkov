import { ApiProperty } from '@nestjs/swagger';
import { SystemRoleEnum } from 'src/api/utils/constants';

export class ResSignIn {
  @ApiProperty({ example: 'token' })
  accessToken: string;

  @ApiProperty({ example: Object.values(SystemRoleEnum).join('/') })
  systemRole: SystemRoleEnum;
}

export class ResSignUp {
  @ApiProperty({ example: 'token' })
  accessToken: string;

  @ApiProperty({ example: Object.values(SystemRoleEnum).join('/') })
  systemRole: SystemRoleEnum;
}
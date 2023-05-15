import { ApiProperty } from '@nestjs/swagger';
import { SystemRoleEnum } from 'src/api/utils/constants';

export class UserModelDefault {
  @ApiProperty({ example: '63546' })
  id: number;

  @ApiProperty({ example: 'evteev@gmail.com' })
  email: string;

  @ApiProperty({ example: 'password' })
  password: string;

  @ApiProperty({ example: 'daniil' })
  name: string;

  @ApiProperty({ example: 'evteev' })
  surname: string;

  @ApiProperty({ example: 123 })
  companyId: number;

  @ApiProperty({ example: Object.values(SystemRoleEnum).join('/') })
  systemRole: SystemRoleEnum;
}

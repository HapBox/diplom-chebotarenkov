import { ApiProperty } from '@nestjs/swagger';

export class ResMessageOk {
  @ApiProperty({ example: 'ok' })
  message: string;
}

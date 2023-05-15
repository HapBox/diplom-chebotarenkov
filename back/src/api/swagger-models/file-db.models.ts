import { ApiProperty } from '@nestjs/swagger';
import { FileTypes } from '../utils/constants';

export class FileDbModelDefault {
  @ApiProperty({ example: 'UUID' })
  id: string;

  @ApiProperty({ example: 'cat' })
  originalName: string;

  @ApiProperty({ example: 'jpg' })
  extension: string;

  @ApiProperty({ example: 1024 })
  size: number;

  @ApiProperty({ example: Object.values(FileTypes).join('/') })
  type: FileTypes;

  @ApiProperty({ example: 'https://agregator.site/media/17254671287' })
  url: string;
}

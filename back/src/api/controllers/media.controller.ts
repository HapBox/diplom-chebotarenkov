import { Controller, Inject, Post, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadedFile } from 'express-fileupload';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MediaService } from '../services/media.service';
import { throwErrorSimple } from '../utils/utils-errors';
import { FileDbModelDefault } from '../swagger-models/file-db.models';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Media')
@Controller('api/v1/media')
export class MediaController {
  constructor(
    @Inject(MediaService)
    private readonly mediaService: MediaService,
  ) {}

  @ApiOperation({ summary: 'Загрузка файла на бэк' })
  @ApiOkResponse({ type: FileDbModelDefault })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  @Post('')
  async signUp(@Res() res, @Req() req, @UploadedFiles() files: {file: Express.Multer.File[]}) {
    if (!files || !files.file) {
      throwErrorSimple('No file send', 400);
    }
    const result = await this.mediaService.uploadMedia(files.file[0] as UploadedFile);
    return res.json(result);
  }
}

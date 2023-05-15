import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filename } from 'src/api/utils/utils-file';

@Injectable()
export class MulterConfig implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: './media',
        filename: filename,
      }),
    };
  }
}

import { UploadedFile } from 'express-fileupload';
import FileDB from 'src/config/postgres/models/final/file-db.model';
import { saveFileIntoDB } from '../utils/utils-file';

export class MediaService {
  public async uploadMedia(file: UploadedFile) {
    let image: FileDB = (await saveFileIntoDB(file))!;
    return image;
  }
}

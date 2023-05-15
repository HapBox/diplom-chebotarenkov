import { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
import { Constants, FileTypes } from './constants';
const fs = require('fs');
import { glob } from 'glob';
import { FRONT_URL } from 'src/config/app/app.config';
import FileDB from 'src/config/postgres/models/final/file-db.model';

interface FileData {
  id: string; //id - сгенеренный, в момент сохранения файда
  extension: string; //Расширение файла
  size: number; //Размер файла
  originalName: string; //Оригинальное название на компе, которое загрузили
  type: string; //Тип файла, берется из enum
}

export function checkFolder(path: string) {
  console.log(path);

  fs.mkdirSync(path, {
    recursive: true,
  });
}

export async function saveFile(file?: UploadedFile): Promise<FileData | undefined> {
  if (!file) return undefined;
  const fileData = processFile(file);
  const dirPath = `.${Constants.MEDIA_FOLDER}/${fileData.type.toLowerCase()}`;
  checkFolder(dirPath);

  fs.copyFileSync('./' + file.path, `${dirPath}/${fileData.id}.${fileData.extension}`);
  fs.rmSync('./' + file.path);

  return fileData;
}

//Сохранение файла в папку на сервере + создание в БД объекта
export async function saveFileIntoDB(file?: UploadedFile): Promise<FileDB | undefined> {
  if (!file) return undefined;
  const fileData = (await saveFile(file))!;

  return await FileDB.create(fileData as any);
}

//Удаление файла
export function deleteFile(fileName: string, params?: { folder?: string; extension?: string }) {
  let filePath = '';
  if (params?.folder) {
    filePath += '/' + params.folder + '/';
  } else {
    filePath += '/**/';
  }
  filePath += fileName;
  if (params?.extension) {
    filePath += '.' + params.extension;
  } else {
    filePath += '.*';
  }

  glob.sync(process.cwd() + `${Constants.MEDIA_FOLDER}${filePath}`).forEach((el) => {
    fs.unlinkSync(el);
  });
}

//Выбираем расширение и выьираем папку
export function processFile(file: UploadedFile): FileData {
  console.log(file);

  //Достаем расширение файла!
  let fileData: FileData = {
    id: uuidv4(),
    size: file.size,
    extension: file.originalname.substr(file.originalname.lastIndexOf('.') + 1),
    originalName: file.originalname.replace(file.originalname.substr(file.originalname.lastIndexOf('.') + 1), ''),
    type: getFileType(file.mimetype),
  };

  return fileData;
}

function getFileType(mimetype: string): FileTypes {
  //Это фотка/картинка
  if (mimetype.includes('image')) {
    return FileTypes.IMAGE;
  }

  //Это видео файл
  if (mimetype.includes('video')) {
    return FileTypes.VIDEO;
  }

  //Это аудионфайл
  if (mimetype.includes('audio')) {
    return FileTypes.AUDIO;
  }

  return FileTypes.DOCUMENT;
}

export function getFileVirtualUrl(fileType: string, fileId: string, fileExtension: string) {
  return  `${FRONT_URL}${Constants.MEDIA_FOLDER}/${fileType.toLowerCase()}/${fileId}.${fileExtension}`;
}

export const filename = (req, file, callback) => {
  const fileRegex = /(.+)\.(.+)/;
  const fileGroups = fileRegex.exec(file.originalname);

  const fileName = uuidv4() + '.' + fileGroups[2];
  callback(null, fileName);
};

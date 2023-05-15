export class Constants {
  static ACCESS_TOKEN_LENGTH: number = 128;
  static HEADER_X_ACCESS_TOKEN: string = 'x-access-token'; //Название заголовка для - accessToken
  static QUERY_X_ACCESS_TOKEN: string = 'xAccessToken'; //Название query для - accessToken
  static CRON_TIMER = '* * * * *';
  static MEDIA_FOLDER: string = `/media`;
}

export enum SystemRoleEnum {
  USER = 'USER',
  COMPANY = 'COMPANY',
}

export enum TypeResearchEnum {
  PHARMACEUTICAL = 'PHARMACEUTICAL',
  PSYCHOLOGICAL = 'PSYCHOLOGICAL',
  PHYSICAL = 'PHYSICAL',
  SOCIAL = 'SOCIAL',
}

export enum FileTypes {
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
}

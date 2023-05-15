import { HttpException } from '@nestjs/common';

export function throwErrorSimple(message: string, statusCode?: number): never {
  throw new HttpException({ message }, statusCode);
}

export function throwNotFoundError(message: string = 'Not found'): never {
  throw new HttpException({ message }, 404);
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import User from 'src/config/postgres/models/final/user.model';
import { Constants } from '../utils/constants';
import { throwErrorSimple, throwNotFoundError } from '../utils/utils-errors';
import { deleteToken, getToken, isExistToken } from '../utils/utils-token';

@Injectable()
export class RequireToken implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.header(Constants.HEADER_X_ACCESS_TOKEN) || (req.query[Constants.QUERY_X_ACCESS_TOKEN] as string);

    if (!accessToken) throwErrorSimple('Token not send', 400);

    if (!(await isExistToken(accessToken))) throwErrorSimple('Incorrect token', 401);

    const token = await getToken(accessToken);

    if (!token.userId) {
      await deleteToken(accessToken);
      throwErrorSimple('Incorrect token', 401);
    }

    const user = await User.findByPk(token.userId);
    if (!user) throwNotFoundError('User Not Found!');

    res.locals.userId = token.userId;
    res.locals.token = accessToken;
    res.locals.systemRole = user.systemRole;
    next();
  }
}

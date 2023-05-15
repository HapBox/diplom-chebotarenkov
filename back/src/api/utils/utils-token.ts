import { nanoid } from 'nanoid';
import { redis } from 'src/config/redis/config';
import { Constants } from './constants';

export interface IAccessToken {
  userId: string;
}

export async function createToken(data: IAccessToken) {
  const accessToken = nanoid(Constants.ACCESS_TOKEN_LENGTH);
  await redis.hSet(accessToken, { ...data });

  return accessToken;
}

export async function getToken(accessToken: string) {
  return (await redis.hGetAll(accessToken)) as unknown as IAccessToken;
}

export async function isExistToken(accessToken: string) {
  return await redis.exists(accessToken);
}

export async function deleteToken(accessToken: string) {
  await redis.del([accessToken]);
}

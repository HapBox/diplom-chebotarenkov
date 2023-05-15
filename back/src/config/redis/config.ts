import * as Redis from 'redis';
import { REDIS_DB_NUMBER, REDIS_DB_URL, REDIS_PASSWORD, REDIS_PORT } from '../app/app.config';

export const redis = Redis.createClient({
  url: 'redis://' + REDIS_DB_URL + ':' + REDIS_PORT + '/' + REDIS_DB_NUMBER,
  password: REDIS_PASSWORD,
});

export async function initRedis() {
  redis.on('error', (err: any) => {
    console.log(err);
    process.exit();
  });

  await redis.connect();

  // await redis.flushDb();
}

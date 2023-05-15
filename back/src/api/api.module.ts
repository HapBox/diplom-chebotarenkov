import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from 'src/config/multer/multer.config';
import { PostgresModule } from 'src/config/postgres/postgres.module';
import { AuthController } from './controllers/auth.controller';
import { MediaController } from './controllers/media.controller';
import { RequireToken } from './middlewares/require-token';
import { ClientModule } from './modules/client.module';
import { AuthService } from './services/auth.service';
import { MediaService } from './services/media.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfig,
    }),
    PostgresModule,
    ClientModule,
  ],
  providers: [AuthService, MediaService],
  controllers: [AuthController, MediaController],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequireToken).forRoutes({ path: 'api/v1/auth/logout', method: RequestMethod.POST });
  }
}

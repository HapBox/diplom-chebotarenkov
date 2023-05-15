import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PostgresModule } from 'src/config/postgres/postgres.module';
import { UserService } from '../services/client/users.service';
import { UserController } from '../controllers/client/users.controller';
import { CompanyService } from '../services/client/company.service';
import { CompanyController } from '../controllers/client/company.controller';
import { CompanyResumeController } from '../controllers/client/company-resume.controller';
import { UserResumeController } from '../controllers/client/user-resume.controller';
import { CompanyResumeService } from '../services/client/company-resume.service';
import { UserResumeService } from '../services/client/user-resume.service';
import { RequireToken } from '../middlewares/require-token';

@Module({
  imports: [PostgresModule],
  providers: [UserService, CompanyService, CompanyResumeService, UserResumeService],
  controllers: [UserController, CompanyController, CompanyResumeController, UserResumeController],
})
export class ClientModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequireToken).forRoutes(UserController, CompanyController, CompanyResumeController, UserResumeController);
  }
}

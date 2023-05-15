import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserResumeCreateDto, UserResumeUpdateDto } from 'src/api/dto/body/client/user-resume.dto';
import { UserResumeService } from 'src/api/services/client/user-resume.service';
import { UserResumeModelDefault } from 'src/api/swagger-models/client/user-resume.model';
import { ResMessageOk } from 'src/api/swagger-models/default/message-ok.model';

@ApiTags('UserResume')
@Controller('api/v1/client/user-resume')
export class UserResumeController {
  constructor(
    @Inject(UserResumeService)
    private readonly userResumeService: UserResumeService,
  ) {}

  @ApiOperation({ summary: 'Получение заявок юзера' })
  @ApiOkResponse({ type: UserResumeModelDefault })
  @Get('/my')
  async getByUserId(@Res() res) {
    const result = await this.userResumeService.getByUserId(res.locals.userId);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Получение заявки по id' })
  @ApiOkResponse({ type: UserResumeModelDefault })
  @Get('/:id')
  async getById(@Res() res, @Param('id') resumeId: number) {
    const result = await this.userResumeService.getById(resumeId);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Создание заявки' })
  @ApiOkResponse({ type: UserResumeModelDefault })
  @Post()
  async create(@Res() res, @Body() body: UserResumeCreateDto) {
    body.userId = res.locals.userId;
    const result = await this.userResumeService.create(body);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Обновление заявки' })
  @ApiOkResponse({ type: UserResumeModelDefault })
  @Patch('/:id')
  async updateById(@Res() res, @Param('id') resumeId: number, @Body() body: UserResumeUpdateDto) {
    body.userId = res.locals.userId;
    body.id = resumeId;
    console.log(body);
    const result = await this.userResumeService.updateById(body);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Удаление заявки' })
  @ApiOkResponse({ type: ResMessageOk })
  @Delete('/:id')
  async deleteById(@Res() res, @Param('id') resumeId: number) {
    const result = await this.userResumeService.deleteById(resumeId, res.locals.userId);
    return res.json(result);
  }
}

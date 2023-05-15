import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompanyResumeCreateDto, CompanyResumeResponseDto, CompanyResumeUpdateDto } from 'src/api/dto/body/client/company-resume.dto';
import { CompanyResumeQueryDto } from 'src/api/dto/query/company-resume.dto';
import { CompanyResumeService } from 'src/api/services/client/company-resume.service';
import { CompanyResumeListModel, CompanyResumeModelDefault } from 'src/api/swagger-models/client/company-resume.model';
import { UserResumeListModel } from 'src/api/swagger-models/client/user-resume.model';
import { ResMessageOk } from 'src/api/swagger-models/default/message-ok.model';

@ApiTags('CompanyResume')
@Controller('api/v1/client/company-resume')
export class CompanyResumeController {
  constructor(
    @Inject(CompanyResumeService)
    private readonly companyResumeService: CompanyResumeService,
  ) {}

  @ApiOperation({ summary: 'Получение списка заявок от компаний' })
  @ApiOkResponse({ type: CompanyResumeListModel })
  @Get()
  async getList(@Res() res, @Query() query: CompanyResumeQueryDto) {
    const result = await this.companyResumeService.getList(query);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Получение списка откликов' })
  @ApiOkResponse({ type: UserResumeListModel })
  @Get(':id/response')
  async getResponseList(@Res() res, @Param('id') resumeId: number) {
    const result = await this.companyResumeService.getResponseList(resumeId, res.locals.companyId);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Получение заявки по id' })
  @ApiOkResponse({ type: CompanyResumeModelDefault })
  @Get('/:id')
  async getById(@Res() res, @Param('id') resumeId: number) {
    const result = await this.companyResumeService.getById(resumeId);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Создание заявки' })
  @ApiOkResponse({ type: CompanyResumeModelDefault })
  @Post()
  async create(@Res() res, @Body() body: CompanyResumeCreateDto) {
    body.companyId = res.locals.companyId;
    body.creatorUser = res.locals.userId;
    const result = await this.companyResumeService.create(body);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Обновление заявки' })
  @ApiOkResponse({ type: CompanyResumeModelDefault })
  @Patch('/:id')
  async updateById(@Res() res, @Param('id') resumeId: number, @Body() body: CompanyResumeUpdateDto) {
    body.userCompanyId = res.locals.companyId;
    body.id = resumeId;
    const result = await this.companyResumeService.updateById(body);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Удаление заявки' })
  @ApiOkResponse({ type: ResMessageOk })
  @Delete('/:id')
  async deleteById(@Res() res, @Param('id') resumeId: number) {
    const result = await this.companyResumeService.deleteById(resumeId, res.locals.companyId);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Отклик на заявку' })
  @ApiOkResponse({ type: ResMessageOk })
  @Post('/response')
  async response(@Res() res, @Body() body: CompanyResumeResponseDto) {
    body.userId = res.locals.userId;
    const result = await this.companyResumeService.response(body);
    return res.json(result);
  }
}

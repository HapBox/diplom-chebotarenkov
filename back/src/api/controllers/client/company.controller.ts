import { Body, Controller, Get, Inject, Patch, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompanyCreateDto, CompanyUpdateDto } from 'src/api/dto/body/client/company.dto';
import { CompanyService } from 'src/api/services/client/company.service';
import { CompanyDefault } from 'src/api/swagger-models/client/company.model';

@ApiTags('Companies')
@Controller('api/v1/client/companies')
export class CompanyController {
  constructor(
    @Inject(CompanyService)
    private readonly companyService: CompanyService,
  ) {}

  @ApiOperation({ summary: 'Получение своей компании' })
  @ApiOkResponse({ type: CompanyDefault })
  @Get('/')
  async getById(@Res() res) {
    const result = await this.companyService.getByUserId(res.locals.userId);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Создание компании' })
  @ApiOkResponse({ type: CompanyDefault })
  @Post()
  async create(@Res() res, @Body() body: CompanyCreateDto) {
    body.userId = res.locals.userId;
    console.log(body);
    const result = await this.companyService.create(body);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Обновление компании' })
  @ApiOkResponse({ type: CompanyDefault })
  @Patch()
  async updateById(@Res() res, @Body() body: CompanyUpdateDto) {
    body.userId = res.locals.userId;
    const result = await this.companyService.updateById(body);
    return res.json(result);
  }
}

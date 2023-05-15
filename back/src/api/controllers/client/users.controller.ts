import { Body, Controller, Get, Inject, Patch, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserUpdateDto } from 'src/api/dto/body/client/users.dto';
import { UserService } from 'src/api/services/client/users.service';
import { UserModelDefault } from 'src/api/swagger-models/client/user.model';

@ApiTags('Users')
@Controller('api/v1/client/users')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Получение юзера' })
  @ApiOkResponse({ type: UserModelDefault })
  @Get('/me')
  async getList(@Res() res) {
    const result = await this.userService.getById(res.locals.userId);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Обновление юзера' })
  @ApiOkResponse({ type: UserModelDefault })
  @Patch('/me')
  async updateById(@Res() res, @Body() body: UserUpdateDto) {
    body.id = res.locals.userId;
    const result = await this.userService.updateById(body);
    return res.json(result);
  }
}

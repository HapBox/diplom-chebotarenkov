import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto, SignUpDto } from '../dto/auth/sign-in.dto';
import { AuthService } from '../services/auth.service';
import { ResSignIn, ResSignUp } from '../swagger-models/default/auth.model';
import { ResMessageOk } from '../swagger-models/default/message-ok.model';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Регистрация' })
  @ApiOkResponse({ type: ResSignUp })
  @Post('sign-up')
  async signUp(@Res() res, @Body() body: SignUpDto) {
    const result = await this.authService.signUp(body);
    return res.json(result);
  }
  
  @ApiOperation({ summary: 'Вход в аккаунт' })
  @ApiOkResponse({ type: ResSignIn })
  @Post('sign-in')
  async signIn(@Res() res, @Body() body: SignInDto) {
    const result = await this.authService.signIn(body);
    return res.json(result);
  }

  @ApiOperation({ summary: 'Выход из аккаунта' })
  @ApiOkResponse({ type: ResMessageOk })
  @Post('logout')
  async logout(@Res() res) {
    const result = await this.authService.logout(res.locals.token);
    return res.json(result);
  }
}

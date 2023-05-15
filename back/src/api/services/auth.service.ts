import User from 'src/config/postgres/models/final/user.model';
import { SignInDto, SignUpDto } from '../dto/auth/sign-in.dto';
import { createToken, deleteToken } from '../utils/utils-token';
import { throwErrorSimple } from '../utils/utils-errors';

export class AuthService {
  public async signUp(dto: SignUpDto) {
    const user = await User.create({
      name: dto.name,
      surname: dto.surname,
      systemRole: dto.systemRole,
      email: dto.email,
      password: dto.password,
    });

    const accessToken = await createToken({ userId: user.id });
    return {
      accessToken,
      systemRole: user.systemRole,
    };
  }

  public async signIn(dto: SignInDto) {
    const user = await User.findOne({
      where: {
        email: dto.email,
        password: dto.password,
      },
    });
    if (!user) {
      throwErrorSimple('Wrong login or password', 400);
    }

    const accessToken = await createToken({ userId: user.id });
    return {
      accessToken,
      systemRole: user.systemRole,
    };
  }

  public async logout(token: string) {
    await deleteToken(token);
    return { message: 'Ok' };
  }
}

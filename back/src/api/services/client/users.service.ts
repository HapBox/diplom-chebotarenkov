import User from 'src/config/postgres/models/final/user.model';
import { throwNotFoundError } from '../../utils/utils-errors';
import { UserUpdateDto } from 'src/api/dto/body/client/users.dto';

export class UserService {
  public async getById(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
      throwNotFoundError('User Not Found');
    }

    return user;
  }

  public async updateById(dto: UserUpdateDto) {
    const user = await User.findByPk(dto.id);

    if (!user) {
      throwNotFoundError('User not found');
    }

    await user.update({
      email: dto.email,
      password: dto.password,
      name: dto.name,
      surname: dto.surname,
    });

    return user;
  }
}

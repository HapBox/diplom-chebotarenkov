import { throwErrorSimple, throwNotFoundError } from '../../utils/utils-errors';
import UserResume from 'src/config/postgres/models/final/user-resume.model';
import { UserResumeCreateDto, UserResumeUpdateDto } from 'src/api/dto/body/client/user-resume.dto';

export class UserResumeService {
  public async getByUserId(userId: number) {
    const userResume = await UserResume.findOne({
      where: {
        userId,
      },
    });

    if (!userResume) {
      throwNotFoundError('UserResume Not Found');
    }

    return userResume;
  }

  public async getById(resumeId: number) {
    const userResume = await UserResume.findByPk(resumeId);

    if (!userResume) {
      throwNotFoundError('UserResume Not Found');
    }

    return userResume;
  }

  public async create(dto: UserResumeCreateDto) {
    const userResume = await UserResume.create({
      description: dto.description,
      userId: dto.userId,
      citizenship: dto.citizenship,
      height: dto.height,
      weight: dto.weight,
      age: dto.age,
    });

    return userResume;
  }

  public async updateById(dto: UserResumeUpdateDto) {
    const userResume = await this.getById(dto.id);

    if (userResume.userId != dto.userId) {
      console.log(userResume.userId, dto.userId);
      
      throwErrorSimple('Forbidden', 403);
    }

    await userResume.update({
      description: dto.description,
      userId: dto.userId,
      citizenship: dto.citizenship,
      height: dto.height,
      weight: dto.weight,
      age: dto.age,
    });

    return userResume;
  }

  public async deleteById(id: number, userId: number) {
    const userResume = await this.getById(id);

    if (userResume.userId !== userId) {
      throwErrorSimple('Forbidden', 403);
    }

    await userResume.destroy();

    return { message: 'ok' };
  }
}

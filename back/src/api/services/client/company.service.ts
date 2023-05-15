import { CompanyCreateDto, CompanyUpdateDto } from 'src/api/dto/body/client/company.dto';
import { throwNotFoundError } from '../../utils/utils-errors';
import Company from 'src/config/postgres/models/final/company.model';
import User from 'src/config/postgres/models/final/user.model';

export class CompanyService {
  public async getByUserId(userId: number) {
    const user = await User.findByPk(userId, {
      include: {
        model: Company,
        duplicating: false,
      },
    });

    if (!user || !user.company) {
      throwNotFoundError('Company Not Found');
    }

    return user.company;
  }

  public async create(dto: CompanyCreateDto) {
    const company = await Company.create({
      userId: dto.userId,
      name: dto.name,
    });

    await User.update(
      {
        companyId: company.id,
      },
      {
        where: {
          id: dto.userId,
        },
      },
    );

    return company;
  }

  public async updateById(dto: CompanyUpdateDto) {
    const company = await this.getByUserId(dto.userId);

    await company.update({
      name: dto.name,
    });

    return company;
  }
}

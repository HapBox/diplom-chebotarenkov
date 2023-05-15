import CompanyResume from 'src/config/postgres/models/final/company-resume.model';
import { throwErrorSimple, throwNotFoundError } from '../../utils/utils-errors';
import { CompanyResumeQueryDto } from 'src/api/dto/query/company-resume.dto';
import { WhereOptions } from 'sequelize';
import { CompanyResumeCreateDto, CompanyResumeResponseDto, CompanyResumeUpdateDto } from 'src/api/dto/body/client/company-resume.dto';
import MMCompanyUserResume from 'src/config/postgres/models/relations/mm-client-file.model';
import UserResume from 'src/config/postgres/models/final/user-resume.model';
import Company from 'src/config/postgres/models/final/company.model';
import User from 'src/config/postgres/models/final/user.model';

export class CompanyResumeService {
  public async getList(query: CompanyResumeQueryDto) {
    let where: WhereOptions = {};

    if (query.companyId) {
      where.companyId = query.companyId;
    }

    if (query.typeResearch) {
      where.companyId = query.typeResearch;
    }

    const companyResumeList = await CompanyResume.findAll({
      where,
      include: [
        {
          model: Company,
          duplicating: false,
        },
      ],
    });

    return companyResumeList;
  }

  public async getById(resumeId: number) {
    const companyResume = await CompanyResume.findByPk(resumeId);

    if (!companyResume) {
      throwNotFoundError('CompanyResume Not Found');
    }

    return companyResume;
  }

  public async create(dto: CompanyResumeCreateDto) {
    const companyResume = await CompanyResume.create({
      name: dto.name,
      companyId: dto.companyId,
      userId: dto.creatorUser,
      typeResearch: dto.typeResearch,
      description: dto.description,
    });

    return companyResume;
  }

  public async updateById(dto: CompanyResumeUpdateDto) {
    const companyResume = await this.getById(dto.id);

    if (companyResume.companyId !== dto.userCompanyId) {
      throwErrorSimple('Forbidden', 403);
    }

    await companyResume.update({
      name: dto.name,
      typeResearch: dto.typeResearch,
      description: dto.description,
    });

    return companyResume;
  }

  public async deleteById(id: number, userCompanyId: number) {
    const companyResume = await this.getById(id);

    if (companyResume.companyId !== userCompanyId) {
      throwErrorSimple('Forbidden', 403);
    }

    await companyResume.destroy();

    return { message: 'ok' };
  }

  public async response(dto: CompanyResumeResponseDto) {
    const userResume = await UserResume.findOne({
      where: {
        userId: dto.userId,
      },
    });

    if (!userResume) {
      throwNotFoundError('UserResume not found!');
    }

    const mmCompanyUserResume = await MMCompanyUserResume.findOne({
      where: {
        userResumeId: userResume.id,
        companyResumeId: dto.companyResumeId,
      },
    });

    if (mmCompanyUserResume) {
      throwErrorSimple('You already send resume!', 400);
    }

    await MMCompanyUserResume.create({
      userResumeId: userResume.id,
      companyResumeId: dto.companyResumeId,
    });

    return { message: 'ok' };
  }

  public async getResponseList(resumeId: number, companyId: number) {
    const companyResumeCheck = await this.getById(resumeId);

    if (companyResumeCheck.companyId !== companyId) {
      throwErrorSimple('Forbidden', 403);
    }

    const companyResume = await CompanyResume.findByPk(resumeId, {
      include: {
        model: UserResume,
        duplicating: false,
        include: [
          {
            model: User,
            duplicating: false,
          },
        ],
      },
    });

    return { userResumeList: companyResume.userResumeList };
  }
}

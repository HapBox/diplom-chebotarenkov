import { ApiProperty } from '@nestjs/swagger';
import { TypeResearchEnum } from 'src/api/utils/constants';
import { CompanyDefault } from './company.model';

export class CompanyResumeModelDefault {
  @ApiProperty({ example: 63546 })
  id: number;

  @ApiProperty({ example: 63546 })
  companyId: number;

  @ApiProperty({ example: 63546 })
  creatorUser: number;

  @ApiProperty({ type: Object.values(TypeResearchEnum).join('/') })
  typeResearch: TypeResearchEnum;

  @ApiProperty({ type: 'СОШИАЛ ЭКСПЕРИМЕНТ???!?' })
  name: string;

  @ApiProperty({ type: 'на тему почему дока 2 уничтожает мою психику' })
  description: string;

  @ApiProperty({ type: CompanyDefault })
  company: CompanyDefault;
}

export class CompanyResumeListModel {
  @ApiProperty({ type: [CompanyResumeModelDefault] })
  companyResumeList: CompanyResumeModelDefault;
}

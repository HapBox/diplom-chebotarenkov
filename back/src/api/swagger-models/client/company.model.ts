import { ApiProperty } from '@nestjs/swagger';

export class CompanyDefault {
  @ApiProperty({ example: '261536' })
  id: number;

  @ApiProperty({ example: 'ООО РОГА И КОПЫТА' })
  name: string;
}

export class CompanyListModel {
  @ApiProperty({ type: [CompanyDefault] })
  companyList: CompanyDefault;
}

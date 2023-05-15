import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TypeResearchEnum } from 'src/api/utils/constants';

export class CompanyResumeCreateDto {
  companyId: number;
  creatorUser: number;

  @ApiProperty({ example: Object.values(TypeResearchEnum).join('/') })
  @IsEnum(TypeResearchEnum)
  typeResearch: TypeResearchEnum;

  @ApiProperty({ example: 'СОШИАЛ ЭКСПЕРИМЕНТ???!?' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'на тему почему дока 2 уничтожает мою психику' })
  @IsString()
  description: string;
}

export class CompanyResumeUpdateDto {
  id: number;
  userCompanyId: number;

  @ApiProperty({ example: Object.values(TypeResearchEnum).join('/') })
  @IsEnum(TypeResearchEnum)
  typeResearch: TypeResearchEnum;

  @ApiProperty({ example: 'СОШИАЛ ЭКСПЕРИМЕНТ???!?' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'на тему почему дока 2 уничтожает мою психику' })
  @IsString()
  description: string;
}

export class CompanyResumeResponseDto {
  userId: number;

  @ApiProperty({ example: 123 })
  @IsNumber()
  companyResumeId: number;
}

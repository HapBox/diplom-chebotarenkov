import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { TypeResearchEnum } from 'src/api/utils/constants';

export class CompanyResumeQueryDto {
  @ApiProperty({ example: Object.values(TypeResearchEnum).join('/') })
  @IsEnum(TypeResearchEnum)
  @IsOptional()
  typeResearch: TypeResearchEnum;

  @ApiProperty({ example: 1223 })
  @IsNumber()
  @IsOptional()
  companyId: number;
}

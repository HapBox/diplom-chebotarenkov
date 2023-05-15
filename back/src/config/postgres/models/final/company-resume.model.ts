import { Table, Column, DataType, Model, HasMany, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import User from './user.model';
import { TypeResearchEnum } from 'src/api/utils/constants';
import Company from './company.model';
import MMCompanyUserResume from '../relations/mm-client-file.model';
import UserResume from './user-resume.model';

@Table({ timestamps: true })
export default class CompanyResume extends Model {
  @Column(DataType.ENUM({ values: Object.values(TypeResearchEnum) }))
  typeResearch: TypeResearchEnum;

  @Column
  name: string;

  @Column
  description: string;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company, {
    foreignKey: 'companyId',
  })
  company: Company;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
  })
  creatorUser: User;

  @BelongsToMany(() => UserResume, () => MMCompanyUserResume)
  userResumeList: Array<UserResume & { MMCompanyUserResume: MMCompanyUserResume }>;
}

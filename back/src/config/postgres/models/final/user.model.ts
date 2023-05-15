import { Table, Column, DataType, Model, AllowNull, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { SystemRoleEnum } from 'src/api/utils/constants';
import Company from './company.model';
import UserResume from './user-resume.model';
import CompanyResume from './company-resume.model';

@Table({ timestamps: true })
export default class User extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  surname: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @Column(DataType.ENUM({ values: Object.values(SystemRoleEnum) }))
  systemRole: SystemRoleEnum;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company, {
    foreignKey: 'companyId',
  })
  company: Company;

  @HasMany(() => UserResume, {
    foreignKey: 'userId',
  })
  userResumeList!: UserResume[];

  @HasMany(() => CompanyResume, {
    foreignKey: 'userId',
  })
  companyResumeList!: CompanyResume[];
}

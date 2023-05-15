import { Table, Column, DataType, Model, AllowNull, ForeignKey } from 'sequelize-typescript';
import UserResume from '../final/user-resume.model';
import CompanyResume from '../final/company-resume.model';

@Table({ timestamps: true })
export default class MMCompanyUserResume extends Model {
  @AllowNull(false)
  @ForeignKey(() => UserResume)
  @Column(DataType.INTEGER)
  userResumeId: number;

  @AllowNull(false)
  @ForeignKey(() => CompanyResume)
  @Column(DataType.INTEGER)
  companyResumeId: number;
}

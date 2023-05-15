import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import User from './user.model';
import CompanyResume from './company-resume.model';

@Table({ timestamps: true })
export default class Company extends Model {
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => User, {
    foreignKey: 'companyId',
  })
  company!: Company[];

  @HasMany(() => CompanyResume, {
    foreignKey: 'companyId',
  })
  companyResumeList!: CompanyResume[];
}

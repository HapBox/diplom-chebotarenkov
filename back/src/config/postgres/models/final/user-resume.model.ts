import { Table, Column, DataType, Model, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import User from './user.model';
import MMCompanyUserResume from '../relations/mm-client-file.model';
import CompanyResume from './company-resume.model';

@Table({ timestamps: true })
export default class UserResume extends Model {
  @Column
  citizenship: string;

  @Column(DataType.FLOAT)
  height: number;

  @Column(DataType.FLOAT)
  weight: number;

  @Column
  age: number;

  @Column
  description: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
  })
  user: User;

  @BelongsToMany(() => CompanyResume, () => MMCompanyUserResume)
  companyResumeList: Array<CompanyResume & { MMCompanyUserResume: MMCompanyUserResume }>;
}

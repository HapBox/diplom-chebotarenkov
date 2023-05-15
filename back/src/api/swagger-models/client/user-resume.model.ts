import { ApiProperty } from '@nestjs/swagger';

export class UserResumeModelDefault {
  @ApiProperty({ example: 63546 })
  id: number;

  @ApiProperty({ example: 'RF' })
  citizenship: string;

  @ApiProperty({ example: 160.2 })
  height: number;

  @ApiProperty({ example: 160.2 })
  weight: number;

  @ApiProperty({ example: 22 })
  age: number;

  @ApiProperty({ type: 'Description' })
  description: string;

  @ApiProperty({ example: 22 })
  userId: number;
}

export class UserResumeListModel {
  @ApiProperty({ type: [UserResumeModelDefault] })
  userResumeList: UserResumeModelDefault;
}

import { ApiProperty } from '@nestjs/swagger';

export class FaqModelDefault {
  @ApiProperty({ example: 'UUID' })
  id: string;

  @ApiProperty({ example: 'как пользоваться системой?' })
  question: string;

  @ApiProperty({ example: 'вот так -> text' })
  answer: string;
}

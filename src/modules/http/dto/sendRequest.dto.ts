import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class SendRequestDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  amount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  description: string;
}

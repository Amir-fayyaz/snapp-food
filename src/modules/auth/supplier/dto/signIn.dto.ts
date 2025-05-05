import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { City } from 'src/modules/supplier/enums/city.enum';

export class SignInnDto {
  @ApiProperty({ example: 'amir' })
  @IsString()
  @Length(3, 50)
  manager_firstname: string;

  @ApiProperty({ example: 'Fayyaz' })
  @IsString()
  @Length(3, 50)
  manager_lastname: string;

  @ApiProperty({ example: '09921810208' })
  @IsPhoneNumber('IR')
  manager_mobile: string;

  @ApiProperty({ enum: City })
  @IsEnum(City)
  city: City;

  @IsPositive()
  @IsInt()
  @ApiProperty({ example: 1 })
  category_id: number;

  @ApiProperty({})
  @IsString()
  store_name: string;

  @ApiProperty()
  @IsString()
  @Length(5, 5)
  otp_code: string;

  @ApiPropertyOptional()
  @IsOptional({})
  invite_code: string;
}

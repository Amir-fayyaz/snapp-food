import { ApiProperty } from '@nestjs/swagger';
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

export class CreateSupplierDto {
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

  @ApiProperty()
  @IsString()
  @Length(3, 70)
  store_name: string;

  @IsPositive()
  @IsInt()
  @ApiProperty({ example: 1 })
  category_id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  invite_code: string;
}

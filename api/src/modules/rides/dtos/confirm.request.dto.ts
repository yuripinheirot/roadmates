import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class DriverDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}

export class ConfirmRequestDto {
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsNumber()
  @IsNotEmpty()
  distance: number;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @Type(() => DriverDto)
  @ValidateNested()
  @IsNotEmpty()
  driver: DriverDto;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}

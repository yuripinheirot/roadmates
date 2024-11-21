import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class DriverDto {
  @IsNumber()
  id: number;

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
  distance: number;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @Type(() => DriverDto)
  @ValidateNested()
  driver: DriverDto;

  @IsNumber()
  value: number;
}

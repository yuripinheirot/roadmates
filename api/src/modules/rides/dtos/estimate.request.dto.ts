import { IsNotEmpty, IsString } from 'class-validator';

export class EstimateRequestDto {
  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsNotEmpty()
  @IsString()
  customerId: string;
}

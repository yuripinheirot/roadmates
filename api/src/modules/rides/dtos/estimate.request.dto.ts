import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class EstimateRequestDto {
  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsNotEmpty()
  @IsUUID()
  customer_id: string;
}

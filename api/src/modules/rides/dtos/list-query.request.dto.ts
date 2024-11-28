import { IsNumber, IsOptional } from 'class-validator';

export class ListQueryRequestDto {
  @IsNumber()
  @IsOptional()
  driver_id?: number;
}

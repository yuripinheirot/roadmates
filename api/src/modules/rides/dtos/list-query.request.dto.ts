import { IsOptional, IsUUID } from 'class-validator';

export class ListQueryRequestDto {
  @IsUUID()
  @IsOptional()
  driver_id?: string;
}

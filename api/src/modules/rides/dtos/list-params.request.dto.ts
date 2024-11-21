import { IsNotEmpty, IsUUID } from 'class-validator';

export class ListParamsRequestDto {
  //TODO: adicionar isUuid para todos os payloads
  @IsUUID()
  @IsNotEmpty()
  customer_id: string;
}

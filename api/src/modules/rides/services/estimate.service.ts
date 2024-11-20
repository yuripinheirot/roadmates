import { Injectable } from '@nestjs/common';

@Injectable()
export class EstimateService {
  handle(body: any) {
    return {
      message: 'Hello World',
      body,
    };
  }
}

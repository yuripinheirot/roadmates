import { Test } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

export const buildTestingModule = () => {
  return Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(CACHE_MANAGER)
    .useValue({
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    })
    .overrideProvider(ConfigService)
    .useValue({
      getOrThrow: jest.fn().mockReturnValue('API_KEY'),
      get: jest.fn().mockReturnValue('silent'),
    });
};

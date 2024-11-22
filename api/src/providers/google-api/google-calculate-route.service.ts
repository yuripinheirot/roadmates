import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { CalculateRouteDto } from './dto/calculate-route.dto';
import { GoogleRouteResponse } from './protocols/google-route-response.type';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER, CacheInterceptor, Cache } from '@nestjs/cache-manager';
import { appConfig } from '@/constants/app-config';

@Injectable()
@UseInterceptors(CacheInterceptor)
export class GoogleCalculateRouteService {
  private GOOGLE_API_KEY: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.GOOGLE_API_KEY = this.configService.getOrThrow('GOOGLE_API_KEY');
  }

  private getCacheKey(dto: CalculateRouteDto): string {
    const { origin, destination } = dto;
    return `google-api-calculate-route-${origin}-${destination}`;
  }

  private async getCacheResponse(
    dto: CalculateRouteDto,
  ): Promise<GoogleRouteResponse | undefined> {
    const cacheKey = this.getCacheKey(dto);
    return this.cacheManager.get<GoogleRouteResponse>(cacheKey);
  }

  private async setCacheResponse(
    dto: CalculateRouteDto,
    response: GoogleRouteResponse,
  ): Promise<void> {
    const cacheKey = this.getCacheKey(dto);
    await this.cacheManager.set(cacheKey, response, appConfig.ttlCacheInMs);
  }

  async calculateRoute(dto: CalculateRouteDto): Promise<GoogleRouteResponse> {
    const { origin, destination } = dto;

    const response = await this.httpService.axiosRef.post(
      `https://routes.googleapis.com/directions/v2:computeRoutes?key=${this.GOOGLE_API_KEY}`,
      {
        origin: {
          address: origin,
        },
        destination: {
          address: destination,
        },
      },
      {
        headers: {
          'X-Goog-FieldMask':
            'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation',
        },
      },
    );

    return response.data;
  }

  async handle(dto: CalculateRouteDto): Promise<GoogleRouteResponse> {
    const cachedRoute = await this.getCacheResponse(dto);

    if (cachedRoute) {
      return cachedRoute;
    }

    const data = await this.calculateRoute(dto);

    await this.setCacheResponse(dto, data);

    return data;
  }
}

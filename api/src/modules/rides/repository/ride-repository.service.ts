import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Driver } from '@prisma/client';

@Injectable()
export class RideRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDriversByMinDistance(minDistance: number): Promise<Driver[]> {
    return this.prismaService.driver.findMany({
      where: {
        minDistance: {
          lte: minDistance,
        },
      },
    });
  }

  async findDriverById(id: string): Promise<Driver | null> {
    return this.prismaService.driver.findUnique({
      where: { id },
    });
  }
}

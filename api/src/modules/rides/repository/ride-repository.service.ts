import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Customer, Driver, Prisma, Ride } from '@prisma/client';
import { ListParamsRequestDto } from '../dtos/list-params.request.dto';
import { ListQueryRequestDto } from '../dtos/list-query.request.dto';

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

  async createRide(data: Prisma.RideCreateInput): Promise<Ride> {
    return this.prismaService.ride.create({ data });
  }

  async listRides(
    data: ListParamsRequestDto & ListQueryRequestDto,
  ): Promise<Ride[]> {
    return this.prismaService.ride.findMany({
      where: {
        customer_id: data.customer_id,
        driver_id: data.driver_id,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findCustomerById(id: string): Promise<Customer | null> {
    return this.prismaService.customer.findUnique({
      where: { id },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GithubRankingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getRanking(date: Date, languageId: string, limit?: number) {
    return this.prismaService.ranking.findMany({
      where: {
        rankDate: date,
        languageId,
      },
      orderBy: {
        rank: 'asc',
      },
      take: limit,
    });
  }
}

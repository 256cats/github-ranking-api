import { Module } from '@nestjs/common';
import { GithubRankingController } from './github-ranking.controller';
import { GithubRankingService } from './github-ranking.service';
import { GithubRankingRepository } from './github-ranking.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [GithubRankingController],
  providers: [GithubRankingService, GithubRankingRepository, PrismaService],
})
export class GithubRankingModule {}

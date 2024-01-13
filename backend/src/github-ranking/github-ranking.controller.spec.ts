import { Test, TestingModule } from '@nestjs/testing';
import { GithubRankingController } from './github-ranking.controller';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { GithubRankingService } from './github-ranking.service';
import { GithubRankingRepository } from './github-ranking.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('GithubRankingController', () => {
  let controller: GithubRankingController;
  let service: GithubRankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubRankingController],
      providers: [
        GithubRankingRepository,
        PrismaService,
        GithubRankingService,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    controller = module.get<GithubRankingController>(GithubRankingController);
    service = module.get<GithubRankingService>(GithubRankingService);
  });

  it('getRanking should return ranking', async () => {
    const result = [
      {
        id: 1,
        rank: 1,
        repoName: 'repoName',
        stars: 100,
        forks: 200,
        languageId: 'javascript',
        repoUrl: 'https://repoUrl',
        username: 'username',
        issues: 300,
        lastCommit: new Date(),
        description: 'description',
        rankDate: new Date(),
        sourceId: 'github',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest
      .spyOn(service, 'getRanking')
      .mockImplementation(() => Promise.resolve(result));
    expect(
      await controller.getRanking(
        { date: new Date(), language: 'javascript' },
        { limit: 1 },
      ),
    ).toBe(result);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GithubRankingService } from './github-ranking.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { GithubRankingRepository } from './github-ranking.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('GithubRankingService', () => {
  let service: GithubRankingService;
  let repository: GithubRankingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GithubRankingService,
        GithubRankingRepository,
        PrismaService,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    service = module.get<GithubRankingService>(GithubRankingService);
    repository = module.get<GithubRankingRepository>(GithubRankingRepository);
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
      .spyOn(repository, 'getRanking')
      .mockImplementation(() => Promise.resolve(result));

    expect(await service.getRanking(new Date(), 'javascript', 1)).toBe(result);
  });
});

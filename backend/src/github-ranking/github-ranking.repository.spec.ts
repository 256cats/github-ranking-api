import { Test, TestingModule } from '@nestjs/testing';
import { GithubRankingRepository } from './github-ranking.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('GithubRankingRepository', () => {
  let prisma: PrismaService;
  let repository: GithubRankingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubRankingRepository, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
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
      .spyOn(prisma.ranking, 'findMany')
      .mockImplementation(() => Promise.resolve(result) as any);

    expect(await repository.getRanking(new Date(), 'javascript', 1)).toBe(
      result,
    );
  });
});

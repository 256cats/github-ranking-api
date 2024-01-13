import { Injectable } from '@nestjs/common';
import { GithubRankingRepository } from './github-ranking.repository';

@Injectable()
export class GithubRankingService {
  constructor(
    private readonly githubRankingRepository: GithubRankingRepository,
  ) {}

  async getRanking(date: Date, languageId: string, limit?: number) {
    return this.githubRankingRepository.getRanking(date, languageId, limit);
  }
}

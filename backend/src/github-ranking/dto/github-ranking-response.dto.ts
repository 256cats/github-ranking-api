import { ApiProperty } from '@nestjs/swagger';
import { Ranking } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class GithubRankingResponseDto implements Ranking {
  @Exclude()
  id: number;

  @ApiProperty({ example: 1, description: 'The rank of the repository' })
  rank: number;
  @ApiProperty({
    example: 'github-ranking',
    description: 'The name of the repository',
  })
  repoName: string;
  @ApiProperty({
    example: 100,
    description: 'Number of stars of the repository',
  })
  stars: number;
  @ApiProperty({
    example: 100,
    description: 'Number of forks of the repository',
  })
  forks: number;
  @ApiProperty({
    example: 'javascript',
    description: 'Language of the repository',
  })
  languageId: string;
  @ApiProperty({
    example: 'https://github.com/256cats/github-ranking-api',
    description: 'The url of the repository',
  })
  repoUrl: string;
  @ApiProperty({
    example: '256cats',
    description: 'The username of repository owner',
  })
  username: string;
  @ApiProperty({
    example: 100,
    description: 'Number of issues in the repository',
  })
  issues: number;
  @ApiProperty({
    example: '2018-12-21T00:00:00.000Z',
    description: 'Last commit date (at the time of ranking)',
  })
  lastCommit: Date;
  @ApiProperty({
    example: 'Description',
    description: 'Description of repository',
  })
  description: string;
  @ApiProperty({
    example: '2018-12-21T00:00:00.000Z',
    description: 'Rank date',
  })
  rankDate: Date;

  @Exclude()
  sourceId: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}

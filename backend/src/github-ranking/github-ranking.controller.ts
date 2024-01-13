import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { GithubRankingService } from './github-ranking.service';
import { TransformDataInterceptor } from '../common/interceptor/transform-data.interceptor';
import { GithubRankingResponseDto } from './dto/github-ranking-response.dto';
import { ParamDto, QueryDto } from './dto/github-ranking-request.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import configuration from '../common/configuration';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller('github-ranking')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('github-ranking')
export class GithubRankingController {
  constructor(private readonly githubRankingService: GithubRankingService) {}

  @Get('/:date/:language')
  @CacheTTL(configuration().githubRanking.cacheTTLMs)
  @UseInterceptors(
    CacheInterceptor,
    new TransformDataInterceptor(GithubRankingResponseDto),
  )
  @ApiOperation({
    summary: 'Get top repositories for given date and language',
  })
  @ApiResponse({
    status: 200,
    description: 'Found repositories',
    type: GithubRankingResponseDto,
  })
  async getRanking(@Param() params: ParamDto, @Query() query: QueryDto) {
    return this.githubRankingService.getRanking(
      params.date,
      params.language,
      query.limit,
    );
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/configuration';
import { GithubRankingModule } from './github-ranking/github-ranking.module';
import { CacheModule } from '@nestjs/cache-manager';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    LoggerModule.forRoot(),
    GithubRankingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

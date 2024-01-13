import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

const expectedResult = {
  rank: 1,
  repoName: 'freeCodeCamp',
  stars: 296587,
  forks: 20633,
  languageId: 'javascript',
  repoUrl: 'https://github.com/freeCodeCamp/freeCodeCamp',
  username: 'freeCodeCamp',
  issues: 6424,
  lastCommit: '2018-12-20T07:03:06.000Z',
  description:
    'The https://www.freeCodeCamp.org open source codebase and curriculum. Learn to code for free together with millions of people.',
  rankDate: '2018-12-20T00:00:00.000Z',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /github-ranking should return ranking for given date and language', async () => {
    const result = await request(app.getHttpServer())
      .get('/github-ranking/2018-12-20/javascript')
      .expect(200);
    expect(result.body[0]).toEqual(expectedResult);
  });

  it('GET /github-ranking should return ranking with default limit', async () => {
    const result = await request(app.getHttpServer())
      .get('/github-ranking/2018-12-20/javascript')
      .expect(200);
    expect(result.body).toHaveLength(100);
  });

  it('GET /github-ranking should return ranking with given limit', async () => {
    const result = await request(app.getHttpServer())
      .get('/github-ranking/2018-12-20/javascript?limit=10')
      .expect(200);
    expect(result.body).toHaveLength(10);
  });

  it('GET /github-ranking should return empty ranking when date not found', async () => {
    const result = await request(app.getHttpServer())
      .get('/github-ranking/2012-12-20/javascript')
      .expect(200);
    expect(result.body).toHaveLength(0);
  });

  it('GET /github-ranking should return empty ranking when language not found', async () => {
    const result = await request(app.getHttpServer())
      .get('/github-ranking/2018-12-20/javascript1')
      .expect(200);
    expect(result.body).toHaveLength(0);
  });
});

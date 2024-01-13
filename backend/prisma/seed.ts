import { PrismaClient } from '@prisma/client';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

const { DATA_DIRECTORY } = process.env;
if (!DATA_DIRECTORY) {
  console.log('DATA_DIRECTORY not set');
  process.exit(1);
}

// using sync methods for simplicity

async function main() {
  const files = readdirSync(DATA_DIRECTORY, { withFileTypes: true }).filter(
    (item) => !item.isDirectory() && item.name.endsWith('csv'),
  );
  console.log(`Found ${files.length} files`);
  const sourceId = 'EvanLi/Github-Ranking';
  await prisma.source.upsert({
    where: {
      id: sourceId,
    },
    create: {
      id: sourceId,
      description:
        'Github rankings from https://github.com/EvanLi/Github-Ranking/tree/master/Data',
    },
    update: {
      description:
        'Github rankings from https://github.com/EvanLi/Github-Ranking/tree/master/Data',
    },
  });

  for (const file of files) {
    try {
      const csvFile = join(DATA_DIRECTORY, file.name);
      console.log(`Processing file ${csvFile}`);
      const rankDate = file.name.match(/\d{4}-\d{2}-\d{2}/);
      const data = readFileSync(csvFile, { encoding: 'utf-8' });

      const records = parse(data, {
        columns: true,
        skip_empty_lines: true,
      });

      const updatedRecords = records
        .filter(
          (record) =>
            record.item !== 'top-100-stars' && record.item !== 'top-100-forks',
        )
        .map((record) => ({
          rank: parseInt(record.rank, 10),
          repoName: record.repo_name,
          stars: parseInt(record.stars, 10),
          forks: parseInt(record.forks, 10),
          languageId: record.item.toLowerCase(),
          repoUrl: record.repo_url,
          username: record.username,
          issues: parseInt(record.issues, 10),
          lastCommit: new Date(record.last_commit),
          description: record.description,
          rankDate: new Date(rankDate[0]),
          sourceId,
        }));
      console.log(`Loaded ${updatedRecords.length} records`);

      await prisma.ranking.createMany({
        data: updatedRecords,
      });

      console.log(`Inserted ${updatedRecords.length} records`);
    } catch (e) {
      console.error(e);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

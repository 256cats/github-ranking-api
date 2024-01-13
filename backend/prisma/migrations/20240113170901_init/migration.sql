-- CreateTable
CREATE TABLE "Ranking" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER NOT NULL,
    "repoName" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "forks" INTEGER NOT NULL,
    "languageId" TEXT NOT NULL,
    "repoUrl" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "issues" INTEGER NOT NULL,
    "lastCommit" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rankDate" DATE NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_rankDate_rank_languageId_sourceId_key" ON "Ranking"("rankDate", "rank", "languageId", "sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Source_id_key" ON "Source"("id");

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

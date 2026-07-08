-- CreateEnum
CREATE TYPE "NoticeCategory" AS ENUM ('EXAM', 'EVENT', 'GENERAL');

-- CreateEnum
CREATE TYPE "NoticePriority" AS ENUM ('NORMAL', 'URGENT');

-- CreateTable
CREATE TABLE "Notice" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "category" "NoticeCategory" NOT NULL DEFAULT 'GENERAL',
    "priority" "NoticePriority" NOT NULL DEFAULT 'NORMAL',
    "publishDate" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notice_priority_publishDate_idx" ON "Notice"("priority", "publishDate");

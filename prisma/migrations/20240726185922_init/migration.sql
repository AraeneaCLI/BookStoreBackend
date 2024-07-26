/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updatedAt";

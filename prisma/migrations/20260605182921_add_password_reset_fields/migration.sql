-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reset_code" INTEGER,
ADD COLUMN     "reset_code_expires" TIMESTAMP(3);

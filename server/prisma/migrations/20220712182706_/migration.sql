-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userStatus" "UserStatus" NOT NULL DEFAULT E'ACTIVE';

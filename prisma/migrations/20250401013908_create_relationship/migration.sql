/*
  Warnings:

  - Added the required column `gym_id` to the `tb_check_ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tb_check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_check_ins" ADD COLUMN     "gym_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tb_check_ins" ADD CONSTRAINT "tb_check_ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_check_ins" ADD CONSTRAINT "tb_check_ins_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "tb_gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

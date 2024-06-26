import { CheCkIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
  create(data: Prisma.CheCkInUncheckedCreateInput): Promise<CheCkIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheCkIn | null>
}
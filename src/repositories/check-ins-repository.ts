import { CheCkIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
  findById(id: string): Promise<CheCkIn | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheCkIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheCkIn[]>
  countByUserId(userId: string): Promise<number>
  create(data: Prisma.CheCkInUncheckedCreateInput): Promise<CheCkIn>
  save(checkIn: CheCkIn): Promise<CheCkIn>
}
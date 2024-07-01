import { Gym } from "@prisma/client"

import { GymsRepository } from "@/repositories/gyms-repository"

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

// Estou só trabalhando com a tipagem do Prisma
// Não estou sujando o Use Case com o Prisma
interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    query,
    page
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
import { Gym } from "@prisma/client"

import { GymsRepository } from "@/repositories/gyms-repository"

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

// Estou só trabalhando com a tipagem do Prisma
// Não estou sujando o Use Case com o Prisma
interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return { gym }
  }
}
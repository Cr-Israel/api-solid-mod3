import { CheCkIn } from "@prisma/client";


import { GymsRepository } from "@/repositories/gyms-repository";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

import { MaxDistanceError } from "./errors/max-distance-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { MaxNumberOfCheckInsError } from "./errors/max-numbers-of-check-ins-error";

import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheCkIn
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    checkInId
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    // Se ele acha o check-in, ele muda a validação
    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
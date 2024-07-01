import { describe, it, expect, beforeEach } from "vitest"

import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"


let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to search nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -22.872064,
      longitude: -43.3160192
    })

    await gymsRepository.create({
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -22.71604,
      longitude: -43.2889514
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.872064,
      userLongitude: -43.3160192
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym' }),
    ])
  })
})
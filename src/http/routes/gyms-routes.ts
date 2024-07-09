import { FastifyInstance } from "fastify";

import { verifyJWT } from "../middlewares/verify-jwt";
import { verifyUserRole } from "../middlewares/verify-user-role";

import { search } from "../controllers/gyms/search";
import { nearby } from "../controllers/gyms/nearby";
import { create } from "../controllers/gyms/create";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
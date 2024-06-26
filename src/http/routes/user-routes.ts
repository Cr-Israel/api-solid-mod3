import { FastifyInstance } from "fastify";

import { register } from "../controllers/user/register";
import { authenticate } from "../controllers/user/authenticate";

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
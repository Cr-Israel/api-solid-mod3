import { FastifyInstance } from "fastify";

import { verifyJWT } from "../middlewares/verify-jwt";

import { register } from "../controllers/users/register";
import { authenticate } from "../controllers/users/authenticate";
import { profile } from "../controllers/users/profile";
import { refresh } from "../controllers/users/refresh";


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
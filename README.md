# 🏋️ GymPass API — sistema de check-in em academias

API REST que permite a usuários fazerem check-in em academias próximas, com validação por
geolocalização, controle de permissões por papel e histórico de frequência.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat-square&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)

---

## Decisões técnicas

- **SOLID e inversão de dependência** — os *use cases* recebem repositórios via construtor e
  dependem de interfaces. A implementação Prisma é um detalhe de infraestrutura.
- **Repositórios in-memory** — toda a regra de negócio é testada sem banco, o que mantém a
  suíte unitária rápida o suficiente para rodar em watch mode durante o desenvolvimento.
- **RBAC via middleware** — rotas administrativas (cadastro de academia, validação de
  check-in) exigem o papel `ADMIN`, verificado a partir do próprio JWT.
- **Refresh token em cookie `httpOnly`** — o access token é de vida curta e fica em memória
  no cliente; o refresh vai em cookie, fora do alcance de JavaScript.
- **Validação de entrada com Zod** — o schema é a fonte da verdade tanto para runtime quanto
  para os tipos do TypeScript.

---

## Regras de negócio

- [x] O usuário deve poder se cadastrar
- [x] O usuário deve poder se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] O usuário deve poder obter seu histórico de check-ins
- [x] O usuário deve poder buscar academias próximas (até 10 km)
- [x] O usuário deve poder buscar academias pelo nome
- [x] O usuário deve poder realizar check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia

## Regras da aplicação

- [x] O usuário não deve poder se cadastrar com e-mail duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver a menos de 100 m da academia
- [x] O check-in só pode ser validado até 20 minutos após ser criado
- [x] O check-in só pode ser validado por administradores
- [x] A academia só pode ser cadastrada por administradores

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Runtime | Node.js |
| Linguagem | TypeScript |
| Framework HTTP | Fastify |
| ORM | Prisma |
| Banco | PostgreSQL |
| Autenticação | JWT + refresh token em cookie |
| Validação | Zod |
| Testes | Vitest (unitários e E2E) |
| Infra | Docker + Docker Compose |

---

## Como rodar

```bash
git clone https://github.com/Cr-Israel/gympass-api.git
cd gympass-api

npm install
cp .env.example .env

docker compose up -d
npx prisma migrate dev

npm run start:dev
```

## Testes

```bash
npm run test          # unitários
npm run test:e2e      # end-to-end
npm run test:coverage
```

---

## Licença

MIT

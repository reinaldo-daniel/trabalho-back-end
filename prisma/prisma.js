const { PrismaClient } = require("@prisma/client");

//Achei essa solução na falta dessa funcionalidade bem interessante, ela esconde a senha em todas as operações que envolverem a model user

// async function excludePasswordMiddleware(params, next) {
//     const result = await next(params)
//     if (params?.model === 'User' && params?.args?.select?.password !== true) {
//       delete result.password
//     }
//     return result
// }

const prisma = new PrismaClient();
// prisma.$use(excludePasswordMiddleware);

module.exports = prisma;

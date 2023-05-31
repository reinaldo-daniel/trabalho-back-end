require("dotenv").config();
const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/prisma");

async function validAuth(request, response, next) {
    try {
        const { authorization } = request.headers;
        
        if (!authorization) return res.status(401).send();
        
        const token = authorization.split(" ")[1];

        const payload = jwt.verify(token, process.env.SIGNATURE);

        const verifyStatusUser = await prisma.user.findFirst({
            where: {
                id: Number(payload),
                status: true
            }
        })

        if(!verifyStatusUser) {
            return response.status(401)
                .json({
                    code: 401,
                    message: "Unauthorized",
                })
        }

        request.userId = payload;

        next();
    } catch(error) {
        response.status(401)
            .json({
                code: 401,
                message: "Unauthorized",
            });
    }
}

module.exports = validAuth;

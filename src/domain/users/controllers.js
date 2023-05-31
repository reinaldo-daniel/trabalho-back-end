require("dotenv").config();
const prisma = require("../../../prisma/prisma");
const {
    loginUserSchema,
    createUserSchema,
    updateUserSchema,
} = require("./validators");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");

async function login(request, response, next) {
    try {
        const {
            email,
            password,
        } = request.body;

        const user = await prisma.user.findFirst({
            where: {
                email,
                status: true,
            }
        })

        if(!user) {
            return response.status(401)
                .json({
                    code: 401,
                    message: "Incorrect email or password",
                })
        }
        
        const verifyPassword = bcrypt.compareSync(password, user.password, {
            expiresIn: process.env.EXPIRY_TIME,
        });

        if(!verifyPassword) {
            return response.status(401)
                .json({
                    code: 401,
                    message: "Incorrect email or password",
                })
        }

        const token = jwt.sign(user.id, process.env.SIGNATURE);

        response.status(200)
            .json({
                code: 200,
                token,
            })
    } catch(error) {
        next(error);
    }
}

async function registerUser(request, response, next) {
    try {
        const {
            name,
            email,
            password
        } = createUserSchema.parse(request.body);

        const verifyEmailExist = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if(verifyEmailExist) {
            return response.status(400)
                .json({
                    code: 400,
                    message: "E-mail already registered",
                });
        }

        const hashPassword = bcrypt.hashSync(password, 10);

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword,
            },
        })

        delete user.password;

        response.status(200)
            .json({
                code: 200,
                ...user,
            });
    } catch(error) {
        if (error instanceof z.ZodError) {
            return response.status(422)
                .json({
                    message: error.errors
                });
        }

        next(error);
    }
}

async function updateUser(request, response, next) {
    try {
        const { 
            userId,
            body, 
        } = request;

        const {
            name,
            email,
            password,
            status,
        } = updateUserSchema.parse(body);

        const userUpdate = await prisma.user.update({
            where: {
                id: Number(userId)
            }, 
            data: {
                name: name,
                email: email,
                password: password,
                status: status,
            }
        })

        response.status(200)
            .json({
                code: 200,
                userUpdate,
            })
    } catch(error) {
        next(error);
    }
}

module.exports = {
    registerUser,
    updateUser,
    login,
}

const z = require("zod");
const stringError = require("../../helpers/errors/stringZodError");
const emailError = require("../../helpers/errors/emailZodError");

const loginUserSchema = z.object({
    email: z.string(stringError)
        .email(emailError),
    password: z.string(stringError),
})

const createUserSchema = z.object({
    name: z.string(stringError),
    email: z.string(stringError)
        .email(emailError),
    password: z.string(stringError),
})

const updateUserSchema = z.object({
    name: z.string(stringError),
    email: z.string(stringError)
        .email(emailError),
    password: z.string(stringError),
    status: z.boolean(),
})

module.exports = {
    loginUserSchema,
    createUserSchema,
    updateUserSchema,
};

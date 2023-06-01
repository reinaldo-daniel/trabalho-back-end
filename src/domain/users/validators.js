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
    confirmPassword: z.string(stringError),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

const updateUserSchema = z.object({
    name: z.string(stringError),
    email: z.string(stringError)
        .email(emailError),
    currentPassword: z.string(stringError),
    newPassword: z.string(stringError)
        .optional(),
    confirmNewPassword: z.string(stringError)
        .optional(),
    status: z.boolean(),
})
.refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New password don't match",
    path: ["confirmNewPassword"],
})

module.exports = {
    loginUserSchema,
    createUserSchema,
    updateUserSchema,
};

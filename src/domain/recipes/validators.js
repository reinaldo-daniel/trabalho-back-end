const z = require("zod");
const stringError = require("../../helpers/errors/stringZodError");

const recipeCreateSchema = z.object({
    name: z.string(stringError),
    description: z.string(stringError),
    preparationTime: z.string(stringError),
})

module.exports = {
    recipeCreateSchema
}

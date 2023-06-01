const prisma = require("../../../prisma/prisma");
const {
    recipeCreateSchema,
} = require("./validators");

async function listRecipes(request, response, next) {
    try {

    } catch(error) {
        next(error);
    }
}

async function registerRecipe(request, response, next) {
    try {
        const {
            userId,
            body,
        } = request;

        const {
            name,
            description,
            preparationTime,
        } = recipeCreateSchema.parse(body);

        const varifyRecipeExist = await prisma.recipe.findFirst({
            where: {
                userId,
                name,
            }
        })

        if(varifyRecipeExist) {
            return response.status(409)
                .json({
                    code: 409,
                    message: "Recipe already registered.",
                })
        }

        const recipe = await prisma.recipe.create({
            data: {
                name: name,
                description: description,
                preparation_time: preparationTime,
                userId: userId,
            }
        })

        response.status(200)
            .json({
                code: 200,
                recipe,
            });
    } catch(error) {
        next(error);
    }
}

async function updateRecipe(request, response, next) {
    try {
        const {
            userId,
            params,
            body,
        } = request;

        const { recipeId } = params;
        
        const {
            name,
            description,
            preparationTime,
        } = body;
        
        const id = Number(recipeId);

        const recipe = await prisma.recipe.findFirst({
            where: {
                id,
                userId,
            },
            include: {
                user: true
            }
        })

        if(!recipe) {
            return response.status(404)
                .json({
                    code: 404,
                    message: "Not found."
                })
        }

        const recipeUpdate = await prisma.recipe.update({
            data: {
                name,
                description,
                preparationTime,
            },
        })

        response.status(200)
            .json({
                code: 200,
                recipeUpdate
            })
    } catch(error) {
        next(error);
    }
}

module.exports = {
    registerRecipe,
    updateRecipe,
    listRecipes
}

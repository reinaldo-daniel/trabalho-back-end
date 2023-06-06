const { Router } = require("express");
const {
    registerRecipe,
    updateRecipe,
    deleteRecipe,
    listUserRecipes,
} = require("./controllers");

const router = Router();

router.post("/", registerRecipe);
router.get("/", listUserRecipes);
router.put("/:recipeId", updateRecipe);
router.delete("/:recipeId", deleteRecipe);

module.exports = router;

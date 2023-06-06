const { Router } = require("express");
const {
    registerRecipe,
    updateRecipe,
    deleteRecipe,
} = require("./controllers");

const router = Router();

router.post("/", registerRecipe);
router.delete("/:recipeId", deleteRecipe);
router.put("/:recipeId", updateRecipe);

module.exports = router;

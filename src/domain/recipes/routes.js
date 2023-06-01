const { Router } = require("express");
const {
    registerRecipe,
    updateRecipe,
} = require("./controllers");

const router = Router();

router.post("/", registerRecipe);
router.put("/:recipeId", updateRecipe);

module.exports = router;

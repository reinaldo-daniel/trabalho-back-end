const { Router } = require("express");
const {
    updateUser,
} = require("./controllers");

const router = Router();

router.put("/", updateUser)

module.exports = router;

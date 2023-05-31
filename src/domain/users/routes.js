const { Router } = require("express");
const {
    updateUser,
} = require("./controllers");

const route = Router();

route.put("/", updateUser)

module.exports = route;

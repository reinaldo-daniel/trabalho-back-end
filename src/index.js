require("dotenv").config();
const express = require("express");
const user = require("./domain/users/routes");
const auth = require("./middleware/auth");
const { 
    login,
    registerUser
} = require("./domain/users/controllers")

const app = express();

app.use(express.json());

app.use("/login", login);
app.use("/register", registerUser);

app.use("/user", auth, user);

app.listen(process.env.APP_PORT, () => {
    console.log(`Sua aplicação está rodando na porta ${process.env.APP_PORT}`);
});

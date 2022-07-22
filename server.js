require("dotenv").config()
const path = require("path")
const express = require("express")
app = express()
const PORT = process.env.APP_PORT || 3000;
const registerWebsocket = require("./sockets");
require("./db")()

app.use(express.json())
app.use(express.static(path.join(__dirname, "src/public")))

const server = app.listen(PORT, () =>
    console.log(`Servidor corriendo en el puerto ${PORT}!`)
);

registerWebsocket(server)
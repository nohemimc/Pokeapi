const express = require('express')
const path = require('path');
const mainController = require(path.join(__dirname+"/src/controllers/main.controller.js"))
const cors = require("cors")
//basic Configuration
const app = express()
app.use(cors())
const port = 3000

app.get("/pokemon/:pokemon", mainController.getPokemon)

app.listen(port, () => {
  console.log(`PokeApi escuchando en el puerto ${port}`)
})

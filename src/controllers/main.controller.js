const path = require('path');
const mainService = require(path.join(__dirname+"/../../src/services/main.service.js"))

mainController = {}

mainController.getPokemon = async(req,res,next)=>{
    try {
        let pokemon = req.params.pokemon
        console.log(pokemon);
        let response = await mainService.getPokemon(pokemon)
        res.json({"pokemon" : response})
    } catch (error) {
        console.error("NOT FOUND")
        res.json("Pokemon no encontrado.")
    }
}



module.exports = mainController

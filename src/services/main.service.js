const fetch = require("node-fetch-commonjs")
mainService = {}
const url = "https://pokeapi.co/api/v2/"
mainService.getPokemon = async (id) =>{
    let pokemon = await (await fetch(`${url}pokemon/${id}`, { method: "GET" })).json()
    return pokemon
}



module.exports = mainService

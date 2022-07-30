"use strict";

// Variables globales
const d = document;
const experiencePokemon = d.getElementById("pokemon-experience");
const imagePokemon = d.getElementById("pokemon-image");
const idPokemon = d.getElementById("idPokemon");
const namePokemon = d.getElementById("view-name");
const abilitiesPokemon = d.getElementById("view-abilities");
const pokemon = d.getElementById("pokemon-name"); //Entrada del input

// Llamada al API: Pokedex
const url = "http://localhost:3000/";
const getPokemon = async () => {
  await fetch(`${url}pokemon/${pokemon.value.toLowerCase()}`, { method: "GET" })
    .then((data) => data.json())
    .then((response) => viewData(response))
    .catch(error => pokemonNotFound(error))
}

const viewData = (response) => {
  clearHTML();

  // Vista de los elementos
  experiencePokemon.innerText = `EXP: ${response.pokemon.base_experience}`;
  imagePokemon.src = response.pokemon.sprites.front_default;
  idPokemon.innerText = `ID: ${response.pokemon.id}`;
  namePokemon.innerText = response.pokemon.name;
  abilitiesPokemon.appendChild(progressBars(response.pokemon.stats));
}

//Limpieza del DOM cada vez que se hace una petición
const clearHTML = () => {
  imagePokemon.classList.remove('img-notFound'); //Remueve la clase de la img referente pokemonNotFound()
  abilitiesPokemon.classList.remove('p-notnotFound'); //Remueve la clase del p referente pokemonNotFound()
  removeChildNodes(abilitiesPokemon);
  d.getElementById("pokemon-image").innerHTML = "";
  d.getElementById("pokemon-experience").innerHTML = "";
  d.getElementById("idPokemon").innerHTML = "";
  d.getElementById("view-name").innerHTML = "";
  d.getElementById("pokemon-name").value = "";
} 


// Crea un DIV con los elementos necesarios para mostrar las habilidades del pokemon
const progressBars = (stats) => {
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  for (let i = 0; i < 6; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.classList.add("progress-bar-striped");
    progressBar.classList.add("bg-warning");
    progressBar.classList.add("progress-bar-animated");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 100);
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);

    statsContainer.appendChild(statContainer);
  }

  return statsContainer;
}

//Elimina stats para cada pokemon
const removeChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Crea un DIV informativo con la información de que el pokemon no se encuentra
const pokemonNotFound = () => {
  clearHTML();
  imagePokemon.src = './img/error.png';
  imagePokemon.classList.add("img-notFound");

  abilitiesPokemon.innerHTML = `
    <p>🙄<br>Pokémon no encontrado, intentalo nuevamente...</p>
  `
  abilitiesPokemon.classList.add("p-notnotFound")
}


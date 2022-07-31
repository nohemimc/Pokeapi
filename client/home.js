"use strict";

// Variables globales
const d = document;
const experiencePokemon = d.getElementById("pokemon-experience");
const imagePokemon = d.getElementById("pokemon-image");
const idPokemon = d.getElementById("idPokemon");
const namePokemon = d.getElementById("view-name");
const abilitiesPokemon = d.getElementById("view-abilities");
const pokemon = d.getElementById("pokemon-name"); //Entrada del input
const search_button = d.getElementById("search-button");

// Evento del botón: search_button
search_button.addEventListener('click', function(e) {
  e.preventDefault();
  getPokemon();
})

// Llamada a la API de Pokémon
const getPokemon = async () => {
  const searchValue = pokemon.value.toLowerCase();
  const pokeapi = `https://pokeapi.co/api/v2/pokemon/${searchValue}`
    await fetch(pokeapi)
      .then((data) => data.json())
      .then((response) => viewData(response))
      .catch((error) => pokemonNotFound(error));
};

// Vista de la información requerida
const viewData = (response) => {
  clearHTML();
  experiencePokemon.innerText = `EXP: ${response.base_experience}`;
  imagePokemon.src = response.sprites.front_default;
  idPokemon.innerText = `ID: ${response.id}`;
  namePokemon.innerText = response.name;
  abilitiesPokemon.appendChild(progressBars(response.stats));
};

// Vista de las habilidades del pokemon
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
};

// Limpieza del DOM cada vez que se hace una petición
const clearHTML = () => {
  imagePokemon.classList.remove("img-notFound"); //Remueve <img> => pokemonNotFound()
  abilitiesPokemon.classList.remove("p-notnotFound"); //Remueve <p> => pokemonNotFound()
  removeChildNodes(abilitiesPokemon);
  d.getElementById("pokemon-image").innerHTML = "";
  d.getElementById("pokemon-experience").innerHTML = "";
  d.getElementById("idPokemon").innerHTML = "";
  d.getElementById("view-name").innerHTML = "";
  d.getElementById("pokemon-name").value = "";
};

// Elimina stats para cada pokemon
const removeChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// Mensaje de pokemonNotFound
const pokemonNotFound = () => {
  clearHTML();
  imagePokemon.src = "./img/error.png";
  imagePokemon.classList.add("img-notFound");

  abilitiesPokemon.innerHTML = `
    <p>😮<br>Pokémon no encontrado, intentalo nuevamente...</p>
  `;
  abilitiesPokemon.classList.add("p-notnotFound");
};

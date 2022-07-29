

const d = document;
const url = "http://localhost:3000/"
const auxiliar = 0 //inicio


async function getPokemon() {

  //Agregar codigo para limpiar el DOM cada vez que se haga una llamada
  document.getElementById('view-name').innerHTML = '';

  //se obtiene el pokemon del input
  let pokemon = d.getElementById("pokemon-name").value

  //se hace llamada al backend
  let response = await (await fetch(`${url}pokemon/${pokemon}`, { method: "GET" })).json()
  
  //se agregan los multiples elementos al DOM
  let header = d.createElement("h4")
  let text = d.createTextNode(response.pokemon.name)

  header.appendChild(text)
  const image = d.getElementById("pokemon-image")

  image.src = response.pokemon.sprites.front_default;
  let name = d.getElementById("view-name")
    
  name.appendChild(header)

  let stats = d.getElementById("view-abilities")

  removeChildNodes(stats)
  stats.appendChild(progressBars(response.pokemon.stats))

  const idPokemon = d.getElementById("idPokemon")
  idPokemon.innerText = `ID: ${response.pokemon.id}`;

  const experiencePokemon = d.getElementById("pokemon-experience")
  experiencePokemon.innerText = `EXP: ${response.pokemon.base_experience}`;

  console.log(response);  
  console.log(response.pokemon.stats);  
}

function progressBars(stats) {
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
    progressBar.classList.add("bg-success");
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
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}


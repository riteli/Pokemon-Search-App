const pokemonList = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const sprite = document.querySelector(".sprite-container");
const types = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const fetchData = async () => {
  try {
    const res = await fetch(pokemonList);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const searchPokemon = async () => {
  const pokemonArr = await fetchData();
  const searchInputVal = searchInput.value.toLowerCase();
  const numberVal = Number(searchInputVal);
  const isPokemonFound = pokemonArr.some(data => data.id === numberVal || data.name === searchInputVal);
  if (isPokemonFound) {
    const url = pokemonList + `/${searchInputVal}`;
    return url;
  } else {
    return alert("Pokémon not found");
  }
}

const showPokemon = async () => {
  const pokemonUrl = await searchPokemon();
  const res = await fetch(pokemonUrl);
  const pokemonData = await res.json();

  pokemonName.textContent = pokemonData.name;
  pokemonId.textContent = `#${pokemonData.id}`;
  weight.textContent = `Weight: ${pokemonData.weight}`;
  height.textContent = `Height: ${pokemonData.height}`;
  sprite.innerHTML = `<img id="pokemon-image" src="${pokemonData.sprites.front_default}" alt="pokemonImage">`;
  types.innerHTML = "";
  for (let i = 0; i < pokemonData.types.length; i++) {
    const typeName = pokemonData.types[i].type.name
    types.innerHTML += `<span class="type ${typeName}">${typeName.toUpperCase()}<span>`;
  }

  hp.textContent = pokemonData.stats[0].base_stat;
  attack.textContent = pokemonData.stats[1].base_stat;
  defense.textContent = pokemonData.stats[2].base_stat;
  specialAttack.textContent = pokemonData.stats[3].base_stat;
  specialDefense.textContent = pokemonData.stats[4].base_stat;
  speed.textContent = pokemonData.stats[5].base_stat;
};

searchForm.addEventListener("submit", e => e.preventDefault());
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    showPokemon;
  }
});
searchBtn.addEventListener("click", showPokemon);
const pokeBox = document.querySelector('#pokeBox');
const pokeSize = 1150;

const colors = {
    fire: '#FFA07A',
    grass: '#98D2A3',
    electric: '#FFE082',
    water: '#87CEEB',
    ground: '#D2691E',  // Um pouquinho mais escura para ground
    rock: '#D2B48C',     // Marrom clarinho para rock
    fairy: '#fceaff',
    poison: '#D8BFD8',
    bug: '#D8F8D8',
    dragon: '#97b3e6',
    psychic: '#FFB6C1',
    flying: '#ADD8E6',
    fighting: '#CD5C5C',
    normal: '#F5F5F5',
    ice: '#B0E0E6',       // Cor de gelo para ice
    ghost: '#7b62a3',
    steel: '#B8B8D0',
    dark: '#708090'
}




const pokeTypes = Object.keys(colors);

let pokemons = [];

const fetchPokemon = async () => {
    for (let i = 1; i <= pokeSize; i++) {
        const pokemon = await getPokemon(i);
        pokemons.push(pokemon);
    }
    displayFilteredPokemon(pokemons);
}

const displayFilteredPokemon = (filteredPokemon) => {
    pokeBox.innerHTML = '';

    filteredPokemon.forEach(pokemon => {
        createPokeCard(pokemon);
    });
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokeCard(data);
    return data;
}

const createPokeCard = (poke) => {
    const pokeEl = document.createElement('div');
    pokeEl.classList.add('pokemon');
    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');
    const pokeType = poke.types.map(type => type.type.name);
    const type = pokeTypes.find(type => pokeType.indexOf(type) > -1);
    const color = colors[type];
    pokeEl.style.backgroundColor = color;
    const pokeInnerHTML = `
    <div class="pokeImg">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png"
        alt="${name}">
</div>

<div class="upon">
    <span class="number">#${id}</span>
    <h2 class="name">${name}</h2>
    <span class="type">Tipo: ${type}</span>
</div>
    `;
    pokeEl.innerHTML = pokeInnerHTML;
    pokeBox.appendChild(pokeEl);
}

const searchPokemon = () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredPokemon = pokemons.filter(pokemon => {
        return (
            pokemon.name.toLowerCase().includes(searchTerm) ||
            pokemon.id.toString().includes(searchTerm)
        );
    });

    displayFilteredPokemon(filteredPokemon);
}

document.querySelector('h1').addEventListener('click', function() {
    location.reload();
});


fetchPokemon();
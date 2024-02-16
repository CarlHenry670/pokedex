const pokeBox = document.querySelector('#pokeBox');
const pokeSize = 1150;

const colors = {
    fire: '#FFA07A',
    grass: '#98D2A3',
    electric: '#FFE082',
    water: '#87CEEB',
    ground: '#D2691E',  
    rock: '#D2B48C',     
    fairy: '#fceaff',
    poison: '#D8BFD8',
    bug: '#D8F8D8',
    dragon: '#97b3e6',
    psychic: '#FFB6C1',
    flying: '#ADD8E6',
    fighting: '#CD5C5C',
    normal: '#F5F5F5',
    ice: '#B0E0E6',       
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

    const firstType = poke.types[0].type.name;
    pokeEl.style.backgroundColor = colors[firstType];
    const allTypes = poke.types.map(type => type.type.name);
    
    const pokeInnerHTML = `
        <div class="pokeImg">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png" alt="${name}">
        </div>

        <div class="upon">
            <span class="number">#${id}</span>
            <h2 class="name">${name}</h2>
            <span class="type">Tipo: ${allTypes.join('/')}</span>
        </div>
    `;

    pokeEl.innerHTML = pokeInnerHTML;
    pokeBox.appendChild(pokeEl);
    pokeEl.addEventListener('click', () => {
        updateNavbar(poke);
    });
}


const updateNavbar = (pokemon) => {
    const modal = document.getElementById('modal');
    const body = document.body;
    const pokemonInfo = document.getElementById('pokemonInfo');
    const movesList = document.getElementById('movesList');
    const pokemonInfoHTML = `
        <h2>${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>    
    `;
    pokemonInfo.innerHTML = pokemonInfoHTML;

    const filteredAndSortedMoves = pokemon.moves
        .filter(move => move.version_group_details[0].level_learned_at > 0)
        .sort((a, b) => a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at);
    const movesListHTML = `
        <h3>Golpes</h3>
        <ul>
            ${filteredAndSortedMoves.map(move => `<li>${move.move.name} (Nível: ${move.version_group_details[0].level_learned_at})</li>`).join('')}
        </ul>
    `;
    movesList.innerHTML = movesListHTML;

    modal.style.display = 'block';
    body.classList.add('no-scroll')
};

const closeModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    const body = document.body;
    modal.style.display = 'none';

    body.classList.remove('no-scroll');
};


// revisa isso plmds
const searchPokemon = () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const foundPokemon = pokemons.find(pokemon => (
        pokemon.name.toLowerCase().includes(searchTerm) ||
        pokemon.id.toString().includes(searchTerm)
    ));
    pokeBox.innerHTML = '';
    if (foundPokemon) {
        createPokeCard(foundPokemon);
    } else {
        displayFilteredPokemon(pokemons);
    }
}


document.querySelector('h1').addEventListener('click', function() {
    location.reload();
});

fetchPokemon();
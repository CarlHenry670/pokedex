const pokeBox = document.querySelector('#pokeBox');
const pokeSize = 1150;

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const pokeTypes = Object.keys(colors);

const fetchPokemon = async () => {
    for (let i = 1; i <= pokeSize; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokeCard(data);
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

fetchPokemon();
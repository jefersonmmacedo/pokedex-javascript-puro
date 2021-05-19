const getPokemunUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(898).fill().map((_, index) => {
    return fetch(getPokemunUrl(index + 1)).then(res => res.json())
})

const generateHTML = pokemons => {
        return pokemons.reduce((accumulator, {id, name, types}) => {
        const elementTypes = types.map(typeInfo => typeInfo.type.name)
        accumulator += `
            <li class="card  ${elementTypes[0]}">
            <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"/>
            <h2 class="card-title"> ${id} - ${name}</h2>
            <p class="card-subtitle">${elementTypes.join(' | ')}</p>
            </li>
            `
        return accumulator
        }, '') 
    }

const innerHTML = pokemons => {
        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = pokemons
        console.log(pokemons)
    }

const pokemonPromisses = generatePokemonPromises()
Promise.all(pokemonPromisses).then(generateHTML).then(innerHTML)

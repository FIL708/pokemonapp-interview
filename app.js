const pokemonList = document.getElementById("pokemon-list")

fetch("https://pokeapi.co/api/v2/pokemon")
    .then((res) => res.json())
    .then((data) => {
        const pokemonNameArray = data.results;

        pokemonNameArray.forEach(element => {
            let pokemonListElement = document.createElement("li");
            pokemonListElement.textContent = element.name;
            pokemonList.appendChild(pokemonListElement);
            pokemonListElement.addEventListener("click", fetchDetailData)
        });   
    })

const fetchDetailData = (event) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${event.target.textContent.toLowerCase()}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => console.log(data))
}

let imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/ditto.png"

// git add .
// git commit -m "adding functionality"
// git push origin
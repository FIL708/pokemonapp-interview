const pokemonList = document.getElementById("pokemon-list")

fetch("https://pokeapi.co/api/v2/pokemon")
    .then((res) => res.json())
    .then((data) => {
        
        const pokemonNameArray = data.results;

        pokemonNameArray.forEach(item => {
            let pokemonListElement = document.createElement("li");
            pokemonListElement.textContent = item.name;
            pokemonListElement.classList.add("pokemon-name")
            pokemonList.appendChild(pokemonListElement);
            pokemonListElement.addEventListener("click", fetchDetailData)
        });   
    })

const detailId = document.querySelector(".detail-id")
const detailName = document.querySelector(".detail-name")
const detailTypes = document.querySelector(".detail-types")
const detailImage = document.querySelector(".detail-image")
const detailStats = document.querySelectorAll(".detail-stat")
const detailEvo = document.querySelector(".detail-evolution")

const fetchDetailData = (event) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${event.target.textContent.toLowerCase()}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.types)
            //ADD ID OF POKEMON
            if (data.id < 10) {
                detailId.textContent = `#00${data.id}`
            } else if (data.id < 100 && data.id >= 10) {
                detailId.textContent = `#0${data.id}`
            } else {
                detailId.textContent = `#${data.id}`
            }
            //ADD NAME OF POKEMON
            detailName.textContent = data.species.name

            //RENDER TYPES OF POKEMON
            detailTypes.innerHTML = ""
            data.types.forEach(item => {
                console.log(item.type.name);
                const typeToRender = document.createElement("p")
                typeToRender.classList.add("detail-type")
                typeToRender.textContent = item.type.name
                detailTypes.appendChild(typeToRender)
            });

            //RENDER IMAGE OF POKEMON
            detailImage

        })
}

// let imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/ditto.png"
// SEARCH BAR

const filterPokemonListByName = () => {
    let input = document.getElementById("search-bar").value.toLowerCase();
    const pokemonListElements = document.getElementsByClassName("pokemon-name");
    for (let index = 0; index < pokemonListElements.length; index++) {
        let itemToCheck = pokemonListElements[index].innerHTML.toLowerCase()
        !itemToCheck.includes(input) ?
            pokemonListElements[index].style.display = "none" :
            pokemonListElements[index].style.display = "list-item"
    }   
}


// git add .
// git commit -m "adding functionality"
// git push origin
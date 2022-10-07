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
const detailStatsName = document.getElementsByClassName("detail-stat-name")
const detailProgress = document.getElementsByTagName("progress")
const detailMeasure = document.querySelectorAll(".detail-size")
const detailEvo = document.querySelector(".detail-evolution")

const fetchDetailData = (event) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${event.target.textContent.toLowerCase()}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            
            //RENDER ID OF POKEMON
            if (data.id < 10) {
                detailId.textContent = `#00${data.id}`
            } else if (data.id < 100 && data.id >= 10) {
                detailId.textContent = `#0${data.id}`
            } else {
                detailId.textContent = `#${data.id}`
            }
            //RENDER NAME OF POKEMON
            detailName.textContent = data.species.name

            //RENDER TYPES OF POKEMON
            detailTypes.innerHTML = ""
            data.types.forEach(item => {
                const typeToRender = document.createElement("p");
                typeToRender.classList.add("detail-type");
                typeToRender.textContent = item.type.name;
                detailTypes.appendChild(typeToRender)
            });

            //RENDER IMAGE OF POKEMON
            const imagesArray = [data.sprites.front_default, data.sprites.back_default];
            detailImage.src = imagesArray[0];
            const changeImage = () => {
                if (detailImage.src === imagesArray[0]) {
                    detailImage.src = imagesArray[1]
                } else if (detailImage.src === imagesArray[1]) {
                    detailImage.src = imagesArray[0]
                }
                setTimeout(changeImage, 2500);
            }
            setTimeout(changeImage, 2500);

            //RENDER STATS OF POKEMON
            for (let index = 0; index < detailProgress.length; index++) {
                let statValue = data.stats[index].base_stat
                let statName = data.stats[index].stat.name

                detailProgress[index].value = statValue
                detailStatsName[index].textContent = `${statName}: ${statValue}`
            }

            //RENDER SIZE OF POKEMON
            detailMeasure[0].textContent = `Height: ${data.height * 10} cm`
            detailMeasure[1].textContent = `Weight: ${data.weight / 10} kg`
        })
}


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
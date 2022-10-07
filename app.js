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
const detailStatsValue = document.getElementsByClassName("detail-stat-value")
const detailProgress = document.getElementsByTagName("progress")
const detailMeasure = document.querySelectorAll(".detail-size")
const detailEvo = document.querySelector(".detail-evolution")


const addBgColorDependOnType = (element) => {
    console.log(element, "color change", element.textContent);
    const type = element.textContent

    switch (element.textContent) {
        case "normal":
            element.style.backgroundColor = "#a8a878"
            break;

        case "fighting":
            element.style.backgroundColor = "#c03029"
            break;

        case "flying":
            element.style.backgroundColor = "#a890f0"
            break;

        case "poison":
            element.style.backgroundColor = "#a040a0"
            break;

        case "ground":
            element.style.backgroundColor = "#e0c068"
            break;

        case "rock":
            element.style.backgroundColor = "#b8a038"
            break;

        case "bug":
            element.style.backgroundColor = "#a8b820"
            break;

        case "ghost":
            element.style.backgroundColor = "#705898"
            break;

        case "steel":
            element.style.backgroundColor = "#b8b8d0"
            break;

        case "fire":
            element.style.backgroundColor = "#f08030"
            break;

        case "water":
            element.style.backgroundColor = "#6890f0"
            break;

        case "grass":
            element.style.backgroundColor = "#78c850"
            break;

        case "electric":
            element.style.backgroundColor = "#f8d030"
            break;

        case "psychic":
            element.style.backgroundColor = "#f85888"
            break;

        case "ice":
            element.style.backgroundColor = "#98d8d8"
            break;

        case "dragon":
            element.style.backgroundColor = "#7038f8"
            break;

        case "dark":
            element.style.backgroundColor = "#705848"
            break;

        case "fairy":
            element.style.backgroundColor = "#ee88ac"
            break;
    }
    
}

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
                addBgColorDependOnType(typeToRender)
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
            
                detailProgress[index].value = statValue
                detailStatsValue[index].textContent = statValue
            }

            //RENDER SIZE OF POKEMON
            detailMeasure[0].textContent = `Height: ${data.height * 10} cm`
            detailMeasure[1].textContent = `Weight: ${data.weight / 10} kg`
        })
    
    const mainWrapper = document.querySelector(".wrapper")
    if (mainWrapper.style.display === "none") {mainWrapper.style.display = "block"}
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
// git push origin main
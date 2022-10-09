const pokemonList = document.getElementById("pokemon-list")
//RENDER POKEMON LIST
fetch("https://pokeapi.co/api/v2/pokemon")
    .then((res) => res.json())
    .then((data) => {
        
        const pokemonNameArray = data.results;

        pokemonNameArray.forEach(item => {
            let pokemonListElement = document.createElement("li");
            pokemonListElement.textContent = item.name;
            pokemonListElement.classList.add("pokemon-name");
            pokemonListElement.setAttribute("value", item.name)
            pokemonList.appendChild(pokemonListElement);
            pokemonListElement.addEventListener("click", fetchDetailData)
        });   
})

const detailId = document.querySelector(".detail-id")
const detailName = document.querySelector(".detail-name")
const detailTypes = document.querySelector(".detail-types")
const detailIcon = document.querySelector(".detail-icon")
const detailImage = document.querySelector(".detail-image")
const detailDes = document.querySelector(".description-text")
const detailStatsValue = document.getElementsByClassName("detail-stat-value")
const detailProgress = document.getElementsByTagName("progress")
const detailInfoValues = document.getElementsByClassName("detail-info-value")
const detailEvolution = document.querySelector(".detail-evolution")

//FUNCTION TO CHANGE TYPE BACKGROUND-COLOR DEPEND ON A TYPE OF POKEMON
const addBgColorDependOnType = (element) => {

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



//FETCH & RENDER POKEMON DETAILS
const fetchDetailData = (event) => {
    const targetRef = event.target.getAttribute("value");
    
    const PokemonUrl = `https://pokeapi.co/api/v2/pokemon/${targetRef}`
    fetch(PokemonUrl)
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

            //RENDER ICON OF POKEMON
            const imagesArray = [data.sprites.front_default, data.sprites.back_default];
            detailIcon.src = imagesArray[0];
            const changeImage = () => {
                if (detailIcon.src === imagesArray[0]) {
                    detailIcon.src = imagesArray[1]
                } else if (detailIcon.src === imagesArray[1]) {
                    detailIcon.src = imagesArray[0]
                }
                setTimeout(changeImage, 2500);
            }
            setTimeout(changeImage, 2500);

            //RENDER IMAGE OF POKEMON
            detailImage.src = data.sprites.other.dream_world.front_default
            detailImage.alt = data.name
            
            //RENDER STATS OF POKEMON
            for (let index = 0; index < detailProgress.length; index++) {
                let statValue = data.stats[index].base_stat
            
                detailProgress[index].value = statValue
                detailStatsValue[index].textContent = statValue
            }

            //FETCH & RENDER ADDITIONAL INFORMATION
            const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${targetRef}`
            
            fetch(speciesUrl)
                .then((res) => res.json())
                .then((dataSpecies) => {
                    
                    let infoToRenderArray = [
                        data.height * 10 + " cm",
                        data.weight / 10 + " kg",
                        dataSpecies.color.name,
                        dataSpecies.shape.name,
                        dataSpecies.habitat.name.replace("-", " "),
                        dataSpecies.generation.name.replace("-", " ")
                    ]

                    for (let index = 0; index < detailInfoValues.length; index++) {
                        detailInfoValues[index].textContent = infoToRenderArray[index]
                    }
                    const description = dataSpecies.flavor_text_entries[1].flavor_text
                    detailDes.textContent = description.replace("\f", " ")

                    //FETCH & RENDER EVOLUTION CHAIN
                    const evolutionUrl = dataSpecies.evolution_chain.url
                    fetch(evolutionUrl)
                        .then((res) => res.json())
                        .then((dataEvolution) => {

                            const chainData = dataEvolution.chain

                            //FIND EVOLUTION CHAIN USING RECURSIVE FUNCTION
                            const findAllEvolutionItems = (obj, arr = []) => {
                                const evoObject = obj;
                                arr.push(obj.species)
                                if (evoObject.hasOwnProperty("evolves_to")) {
                                    if (evoObject.evolves_to.length) {
                                        findAllEvolutionItems(evoObject.evolves_to[0], arr)
                                    }
                                }
                                return arr
                            }

                            let evoArr = findAllEvolutionItems(chainData)

                            //CHANGING POKEMON URL IN EVOLUTION CHAIN FROM .../pokemon-species/... TO /pokemon/
                            const validEvoArr = evoArr.map(item => item.url.replace("pokemon-species", "pokemon"))

                            //RENDER IMAGE AND NAME OF POKEMON IN EVOLUTION CHAIN
                            detailEvolution.innerHTML = ""
                            const evolutionHeader = document.createElement("h3")
                            evolutionHeader.textContent = "Evolution Chain"
                            detailEvolution.appendChild(evolutionHeader)

                            validEvoArr.forEach(url => {
                                fetch(url)
                                    .then((res) => res.json())
                                    .then((dataChain) => {
                                        const imageUrl = dataChain.sprites.other.dream_world.front_default
                                        const pokemonName = dataChain.name
                                        
                                        //CREATE IMAGE 
                                        const imageToRender = document.createElement("img")
                                        imageToRender.className = "evolution-img"
                                        imageToRender.setAttribute("src", imageUrl)
                                        imageToRender.setAttribute("alt", pokemonName)
                                        imageToRender.setAttribute("value", pokemonName)
                                        imageToRender.addEventListener("click", fetchDetailData)


                                        //CREATE NAME PARAGRAPH
                                        const nameParagraph = document.createElement("p")
                                        nameParagraph.textContent = pokemonName
                                        nameParagraph.className = "evolution-paragraph"

                                        //CREATE EVOLVE CONTAINER AND APPEND ALL ELEMENTS
                                        const evolveContainer = document.createElement("div")
                                        evolveContainer.className = "evolution-container"
                                        detailEvolution.appendChild(evolveContainer)
                                        detailEvolution.appendChild(evolveContainer)
                                        evolveContainer.appendChild(imageToRender)
                                        evolveContainer.appendChild(nameParagraph)
                                    })
                            });
                        })
                })
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
// git commit -m "styling..."
// git push origin main
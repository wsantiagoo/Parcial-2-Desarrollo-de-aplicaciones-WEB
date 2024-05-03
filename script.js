const apiUrl1 = "https://pokeapi.co/api/v2/pokemon/";
const apiUrl2 = "https://pokeapi.co/api/v2/pokemon-species/";
const apiUrl3 = "https://pokeapi.co/api/v2/evolution-chain/";

let idPokemon=""

async function consultarApiPokemon(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`fallo la consulta a la api: ${error}`);
      const contError = document.querySelector(".containerError");      
      const contInfo = document.querySelector(".containerInfo");
      contError.style.display = "block";
      contInfo.style.display = "none";
      
    }
  }

  async function obtenerDatosPokemon(url) {

    const datos = await consultarApiPokemon(url);

    idPokemon = datos.id
    console.log(idPokemon)

    const url2 = `${apiUrl2}${idPokemon}`;
    console.log(url2);

    const datos2 = await consultarApiPokemon(url2);

    const url3 = `${apiUrl3}${idPokemon}`;
    console.log(url3);

    const datos3 = await consultarApiPokemon(url3);

    let descripcionPokemon = document.querySelector(".pokemonDescrition")
    descripcionPokemon.innerHTML = datos2.flavor_text_entries.filter(entry => entry.language.name === 'es').map(entry => entry.flavor_text);
    console.log(datos2.flavor_text_entries.filter(entry => entry.language.name === 'es').map(entry => entry.flavor_text))

    let nombrePokemon = document.querySelector(".pokemonName");
    nombrePokemon.innerHTML = datos.name;
    console.log(datos.name)

    let imagenPokemon = document.querySelector(".pokemonImg");
    imagenPokemon.src = datos["sprites"]["other"]["official-artwork"]["front_default"];
    console.log(datos["sprites"]["other"]["official-artwork"]["front_default"])

    let tipoPokemon = document.querySelector(".pokemonType");
    tipoPokemon.innerHTML = datos.types[0].type.name;
    console.log(datos.types[0].type.name)
    
    let habilidadesPokemon = document.querySelector(".pokemonAbilities")
    var abilitiesString = "";
    for (var i = 0; i < datos.abilities.length; i++) {
        abilitiesString += datos.abilities[i].ability.name;

        if (i < datos.abilities.length - 1) {
            abilitiesString += ", ";
        }
    }
    habilidadesPokemon.innerHTML = abilitiesString;
    console.log(abilitiesString)

    const contPokemon = document.querySelector(".containerInfo");
    const contError = document.querySelector(".containerError");      

    contPokemon.style.display = "block";
    contError.style.display = "none";
    
  }

  
const searchButton = document.querySelector(".containerFinder button");
const searchInput = document.querySelector(".containerFinder input");

searchButton.addEventListener("click", () => {
  const nombrePokemon = searchInput.value;
  console.log(nombrePokemon);
  const url1 = `${apiUrl1}${nombrePokemon}`;
  console.log(url1);
  obtenerDatosPokemon(url1);

});
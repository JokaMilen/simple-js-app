let pokemonRepository = (
  function() {
    let pokemonList = [];
    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function getAll() {
      return pokemonList;
    }

    return {
      add: add,
      getAll: getAll
    };
  })();



pokemonRepository.add({name: "Bulbasaur", height: 0.7, types: ['grass','poison']});
pokemonRepository.add({name: "Ivysaur", height: 1, types: ['grass','poison']});
pokemonRepository.add({name: "Charmander", height: 0.6, types: ['fire']});

function printPokemon(pokemon) {
  let bigText = pokemon.height >= 1 ? " - Wow, that’s big!" : "";
  document.write(pokemon.name + " (height: "+ pokemon.height +")" + bigText + "<br>");
}

let pokemonList = pokemonRepository.getAll();

document.write("<p>");
pokemonList.forEach(printPokemon);
document.write("</p>");

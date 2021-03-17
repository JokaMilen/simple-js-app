let pokemonList = [];
pokemonList.push({name: "Bulbasaur", height: 0.7, types: ['grass','poison']});
pokemonList.push({name: "Ivysaur", height: 1, types: ['grass','poison']});
pokemonList.push({name: "Charmander", height: 0.6, types: ['fire']});

document.write("<p>")
for (let i = 0; i<pokemonList.length; i++) {
  let currentPokemon = pokemonList[i];
  let bigText = currentPokemon.height >= 1 ? " - Wow, that’s big!" : "";
  document.write(currentPokemon.name + " (height: "+ currentPokemon.height +")" + bigText + "<br>");
}
document.write("</p>")

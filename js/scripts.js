let pokemonRepository = (
  function() {
    let pokemonList = [];

    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon) {
      let list = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("pokemon-button");
      button.addEventListener('click', function (event) {
        showDetails(pokemon);
      });

      listItem.appendChild(button);
      list.appendChild(listItem);
    }

    function showDetails(pokemon) {
      console.log(pokemon);
    }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
  })();

pokemonRepository.add({name: "Bulbasaur", height: 0.7, types: ['grass','poison']});
pokemonRepository.add({name: "Ivysaur", height: 1, types: ['grass','poison']});
pokemonRepository.add({name: "Charmander", height: 0.6, types: ['fire']});


pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

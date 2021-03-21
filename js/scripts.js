let pokemonRepository = (
  function() {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=15";

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
      loadDetails(pokemon).then(function(){
        console.log(pokemon);
      })
    }

    function loadList() {
      return fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          let pokemonResultList = json.results;

          pokemonResultList.forEach(function(item) {
            let pokemon = createPokemon(item);
            add(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        })
    }

    function createPokemon(item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };

      return pokemon;
    }

    function loadDetails(pokemon) {
      return fetch(pokemon.detailsUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          pokemon.imageUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let list = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("group-list-item");
    let button = document.createElement("button");
    button.classList.add("btn", "btn-outline-secondary", "pokemon-button");
    button.innerText = pokemon.name;
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    button.addEventListener("click", function() {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    list.appendChild(listItem);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon.name, "Height: " + pokemon.height, pokemon.imageUrl);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        let pokemonResultList = json.results;

        pokemonResultList.forEach(function(item) {
          let pokemon = createPokemon(item);
          add(pokemon);
        });
      });
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
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
      });
  }

  function showModal(title, text, image) {
    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    let modalTitle = $(".modal-title");
    modalTitle.empty();
    modalTitle.append(titleElement);

    let contentElement = document.createElement("p");
    contentElement.innerText = text;

    let imageElement = document.createElement("img");
    imageElement.src = image;

    let modalBody = $(".modal-body");
    modalBody.empty();

    modalBody.append(contentElement);
    modalBody.append(imageElement);
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
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

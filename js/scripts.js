let pokemonRepository = (
  function() {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=15";
    let modalContainer = document.querySelector('#modal-container');
    let container = document.querySelector('#image-container');

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
        //console.log(pokemon);
        showModal(pokemon.name, "Height: " + pokemon.height, pokemon.imageUrl);
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

    function showModal(title, text, image) {
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = title;

      let contentElement = document.createElement('p');
      contentElement.innerText = text;

      let imageElement = document.createElement('img');
      imageElement.src = image;


      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
      modal.appendChild(imageElement)


      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
     }
    });

    modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

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

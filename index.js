import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

const urlApi = "https://rickandmortyapi.com/api/character";

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

// Fetch the data from the API and store the data in const arrayCharater
async function fetchCharacters(urlApi) {
  try {
    const response = await fetch(urlApi);
    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      throw new Error(`Uups, da ist was falsch gelaufen: ${response.status} `)
    }

    // Check if json format
    if (!contentType.includes("json")) {
      throw new Error(`Uups, das ist kein json Format ${contentType} `);
    }

    // Get all the characters in the array 
    const apiData = await response.json()
    const arrayCharater = apiData.results;

    // Emptied every time the cardContainer before fetch new characters
    cardContainer.innerHTML = "";

    // Get one by one character from the hole big array (arrayCharater)
    arrayCharater.forEach((character) => {
      cardContainer.append(CharacterCard(character));
    });

  } catch (error) {
    console.log(`Fehler ist geworfen: ${error.message} `);

  }
}

fetchCharacters(urlApi);

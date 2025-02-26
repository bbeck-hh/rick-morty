import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { Pagination } from "./components/NavPagination/NavPagination.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
const searchQuery = "";

const urlApi = () => `https://rickandmortyapi.com/api/character/?page=${page}`;

// Create the eventlisteners for next and previous

nextButton.addEventListener("click", () => {
  if (page >= maxPage) {
    // throw new Error("Page Error");
    alert("There is nothing beyond this point, idiot!");
    nextButton.disabled = true;
    return;
    // prevButton.disabled = false;
  } else {
    prevButton.disabled = false;
  }
  page++;
  console.log(urlApi());
  fetchCharacters(urlApi());
});

prevButton.addEventListener("click", () => {
  if (page <= 1) {
    // throw new Error("Page Error");
    alert("There is nothing beyond this point, idiot!");
    prevButton.disabled = true;
    return;
  } else {
    nextButton.disabled = false;
  }
  page--;
  console.log(urlApi());
  fetchCharacters(urlApi());
});

// Fetch the data from the API and store the data in const arrayCharater
async function fetchCharacters(urlApi) {
  try {
    const response = await fetch(urlApi);
    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      throw new Error(`Uups, da ist was falsch gelaufen: ${response.status} `);
    }

    // Check if json format
    if (!contentType.includes("json")) {
      throw new Error(`Uups, das ist kein json Format ${contentType} `);
    }

    // Get all the characters in the array
    const apiData = await response.json();
    const arrayCharater = apiData.results;
    const apiInfo = apiData.info;

    // Update page info
    maxPage = apiInfo.pages;

    // Emptied every time the cardContainer before fetch new characters
    cardContainer.innerHTML = "";

    // Get one by one character from the hole big array (arrayCharater)
    arrayCharater.forEach((character) => {
      cardContainer.append(CharacterCard(character));
    });

    // Fill the page number && max page in the pagination part
    pagination.textContent = Pagination(page, maxPage);

  } catch (error) {
    console.log(`Fehler ist geworfen: ${error.message} `);
  }
}

fetchCharacters(urlApi());

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
let searchQuery = "";

const urlApi = () => `https://rickandmortyapi.com/api/character/?page=${page}`;

// Create the eventlisteners for next and previous
nextButton.addEventListener("click", () => {
  page++;
  console.log(urlApi());
  fetchCharacters(calculateApiURL());
});

prevButton.addEventListener("click", () => {
  page--;
  console.log(urlApi());
  fetchCharacters(calculateApiURL());
});

// Create the eventlistener for searchBar
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  searchQuery = data.query;
  page = 1;
  fetchCharacters(calculateApiURL());
});

// Fetch the data from the API and store the data in const arrayCharater
export async function fetchCharacters(urlApi, searchQuery) {
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

    // next & prevButton edge cases (first & last page)
    prevButton.disabled = false;
    nextButton.disabled = false;

    if (page === 1) {
      prevButton.disabled = true;
    }
    if (page >= maxPage) {
      nextButton.disabled = true;
    }
  } catch (error) {
    console.log(`Fehler ist geworfen: ${error.message} `);
  }
}

// Calculate the Api URL
function calculateApiURL() {
  const baseURL = urlApi();

  if (!searchQuery) {
    return baseURL;
  } else {
    return `${baseURL}&name=${searchQuery}`;
  }
}

// Render page
fetchCharacters(calculateApiURL());

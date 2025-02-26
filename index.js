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
const maxPage = 1;
const page = 1;
const searchQuery = "";

// Fetch the data from the API 
async function fetchCharacters(page) {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      throw new Error(`Uups, da ist was falsch gelaufen: ${response.status} `)
    }

    // Check if json format
    if (!contentType.includes("json")) {
      throw new Error(`Uups, das ist kein json Format ${contentType} `);
    }

    return await response.json();

  } catch (error) {
    console.log(`Fehler ist geworfen: ${error.message} `);

  }
}

console.log(fetchCharacters());

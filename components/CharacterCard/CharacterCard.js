export function createCharacterCard() { }

export function CharacterCard(characterData) {

    // it could be destructored, but no must have ;-)
    //const { name, image, status, type, episode, ...restCharacterInfo } = characterData;

    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `
    <div class="card__image-container">
        <img
            class="card__image"
            src=${characterData.image}
            alt=${characterData.name}
        />
        <div class="card__image-gradient"></div>
        </div>
        <div class="card__content">
        <h2 class="card__title">${characterData.name} </h2>
        <dl class="card__info">
            <dt class="card__info-title">Status</dt>
            <dd class="card__info-description">${characterData.status}</dd>
            <dt class="card__info-title">Type</dt>
            <dd class="card__info-description">${!characterData.type ? 'Human (?)' : characterData.type}</dd>
            <dt class="card__info-title">Occurrences</dt>
            <dd class="card__info-description">${characterData.episode.length}</dd>
        </dl>
    </div>
    `;

    return card
}

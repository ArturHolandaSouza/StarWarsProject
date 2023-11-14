let currentPageUrl = 'https://swapi.dev/api/planets/';

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }
    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);

}

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        responseJson.results.forEach((character) => {
            const card = document.createElement("div");
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/planets/${character.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";
            
            const characterNameBG = document.createElement("div");
            characterNameBG.className = "character-name-bg";

            const characterName = document.createElement("span");
            characterName.className = "character-name";
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName);
            card.appendChild(characterNameBG);

            card.onclick = () => {
                const modal = document.getElementById('modal');
                modal.style.visibility = 'visible';

                const modalContent = document.getElementById('modal-content');
                modalContent.innerHTML = '';

                const characterImage = document.createElement('div');
                characterImage.style.backgroundImage =
                `url('https://starwars-visualguide.com/assets/img/planets/${character.url.replace(/\D/g, "")}.jpg')`;
                characterImage.className = 'character-image'

                const name = document.createElement('span');
                name.className = 'character-details';
                name.innerText = `Nome: ${character.name}`;

                const rotationPeriod = document.createElement('span');
                rotationPeriod.className = 'character-details';
                rotationPeriod.innerText = `Periodo de rotacao: ${character.rotation_period}`;

                const orbitalPeriod = document.createElement('span');
                orbitalPeriod.className = 'character-details';
                orbitalPeriod.innerText = `Periodo orbital: ${character.orbital_period}`;

                const diameter = document.createElement('span');
                diameter.className = 'character-details';
                diameter.innerText = `Diametro: ${character.diameter}`;

                const population = document.createElement('span');
                population.className = 'character-details';
                population.innerText = `Populacao: ${character.population=='unknown'?'desconhecida':character.population}`;

                modalContent.appendChild(characterImage);
                modalContent.appendChild(name);
                modalContent.appendChild(rotationPeriod);
                modalContent.appendChild(orbitalPeriod);
                modalContent.appendChild(diameter);
                modalContent.appendChild(population);
            }

            mainContent.appendChild(card);
        });

        const nextButton = document.getElementById("next-button");
        const backButton = document.getElementById("back-button");

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        nextButton.style.visibility = responseJson.next? "visible" : "hidden";
        backButton.style.visibility = responseJson.previous? "visible" : "hidden";
        
        currentPageUrl = url;

    } catch (error) {
        alert('Erro ao carregar os personagens');
        console.log(error);
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.next);

    } catch (error){
        console.log(error);
        alert('Erro ao carregar a  próxima página');
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.previous);

    } catch (error){
        console.log(error);
        alert('Erro ao carregar a página anterior');
    }
}

function hideModal() {
    const modal = document.getElementById('modal');
    modal.style.visibility = 'hidden';
}
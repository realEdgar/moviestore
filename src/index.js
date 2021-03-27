const API_URL = "https://yts.mx/api/v2/list_movies.json"
const container = document.getElementById('root');

// Adding interactivity to the icons on the header section

const $iconHamburger = document.querySelector('.icon-hamburger');
const $iconClose = document.querySelector('.icon-close-menu');

$iconHamburger.addEventListener('click', showModal);
$iconClose.addEventListener('click', hideModal);

function showModal(ev) {
    $iconHamburger.style.display = 'none';
    $iconClose.style.display = 'block';
}

function hideModal(ev) {
    $iconHamburger.style.display = 'block';
    $iconClose.style.display = 'none';
}

// Geting values of the API
const getData = async (url) => {
    const response = await fetch(url);
    const { data: { movies: data } } = await response.json();
    return data;    
};
// Creating templates
const movieTemplate = (peli) => {
    return (`
        <article class="article__movie" >
            <figure class="article__image">
                <img src=${peli.medium_cover_image} alt="Image of the movie">
            </figure>
            <div class="text__container">
                <h1 class="article__title">${peli.title}</h1>
                <ul class="article__price">
                    <li>Rent: <strong>$1 USD</strong></li>
                    <li>Buy: <strong>$1.5 USD</strong></li>
                </ul>
                <div class="buttons__container">
                    <button id=rent_${peli.id} class="article__button--rent">Rent</button>
                    <button id=buy_${peli.id} class="article__button--buy">Buy</button> 
                </div> 
                <p class="article__description"><b>Synopsis:</b> ${peli.synopsis}</p>            
            </div>
        </article>
    `)
}
const modalDetailsTemplate = (peli) => {
    return (`
    <article class="modal__container">
        <p class="modal__details">Rent Details</p>
        <h2 class="modal__title">${peli.title}</h2>
        <strong>ID: ${peli.id}</strong>
        <p class="modal__price">Price: <em>$1 USD</em></p>
        <p class="modal__synopsis"><b>Synopsis: </b>${peli.synopsis}</p>
        <div class="modal__button-container">
            <button class="modal__button-rent">Rent</button>
            <button class="modal__button-cancel">Cancel</button>
        </div>
    </article> 
    `)
}

// Adding articles to the DOM
async function load() {
    const datos = await getData(API_URL);
    console.log(datos);
    datos.forEach(movie => {
        const HTMLString = movieTemplate(movie);
        const html = document.implementation.createHTMLDocument()
        html.body.innerHTML = HTMLString;
        container.append(html.body.children[0]);
    })
}
load();

// Show modal to Rent

async function showRentModal() {
    
}
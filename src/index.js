const API_URL = "https://yts.mx/api/v2/list_movies.json?genre"
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
    const { data } = await response.json();
    return data.movies;    
};
// Creating the template
const movieTemplate = (peli) => {
    return (`
        <article class="article__movie">
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
                    <button class="article__button--rent">Rent</button>
                    <button class="article__button--buy">Buy</button> 
                </div> 
                <p class="article__description"><b>Synopsis:</b> ${peli.synopsis}</p>            
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
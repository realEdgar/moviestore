const API_URL = "https://yts.mx/api/v2/list_movies.json";

// Getting the containers

const $containerAll = document.getElementById('allmovies');
const $containerAction = document.getElementById('action');
const $containerComedy = document.getElementById('comedy');
const $containerDrama = document.getElementById('drama');
const $containerAnimation = document.getElementById('animation');

// --------------------------------------------------------- //

// Adding interactivity to the icons on the header section

const $iconHamburger = document.querySelector('.icon-hamburger');
const $iconClose = document.querySelector('.icon-close-menu');
const $headerModal = document.querySelector('.header__nav');
const $nav__elements = document.querySelectorAll('.nav__list a');

$nav__elements.forEach(item => item.addEventListener('click', hideModal));

// Response to the viewport width

const width = window.innerWidth;

if(width >= 800) {
    $iconHamburger.removeEventListener('click', showModal);
    $iconClose.removeEventListener('click', hideModal);
} else {
    $iconHamburger.addEventListener('click', showModal);
    $iconClose.addEventListener('click', hideModal);
}

// -------------------------------------------------------- //

function showModal(ev) {
    $iconHamburger.style.display = 'none';
    $iconClose.style.display = 'block';
    $headerModal.style.display = 'flex';
}

function hideModal(ev) {
    $iconHamburger.style.display = 'block';
    $iconClose.style.display = 'none';
    $headerModal.style.display = 'none'
}

// Geting values of the API

const getData = async (url) => {
    try {
        const response = await fetch(url);
        const { data: { movies: data } } = await response.json();
        return data;
    }
    catch(error) {
        alert(error + ': \n Sorry But we have problems with the movies, try later!!');
    }
};

// Creating templates

const movieTemplate = (peli) => {
    return (`
        <article class="article__movie" >
            <figure class="article__image">
                <img src=${peli.medium_cover_image} alt="Image of the movie">
            </figure>
            <div class="text__container">
                <div class="buttons__container">
                    <button id=${peli.id} class="article__button--rent">Rent</button>
                    <button id=${peli.id} class="article__button--buy">Buy</button> 
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

// Function that Load Movies abailable on the DOM

async function load() {
    const popularMovies = await getData(API_URL);
    const actionMovies = await getData(`${API_URL}?genre=action`);
    const comedyMovies = await getData(`${API_URL}?genre=comedy`);
    const dramaMovies = await getData(`${API_URL}?genre=drama`);
    const animationMovies = await getData(`${API_URL}?genre=animation`);
    console.log("The best movies", popularMovies);
    console.log("Action Movies", actionMovies);
    console.log("Comedy Movies", comedyMovies);
    console.log("Animation Movies", animationMovies);
    console.log("Drama Movies", dramaMovies);
    popularMovies.forEach(movie => {
        const HTMLString = movieTemplate(movie);
        const html = document.implementation.createHTMLDocument()
        html.body.innerHTML = HTMLString;
        $containerAll.append(html.body.children[0]);
    });
    actionMovies.forEach(movie => {
        const HTMLString = movieTemplate(movie);
        const html = document.implementation.createHTMLDocument()
        html.body.innerHTML = HTMLString;
        $containerAction.append(html.body.children[0]);
    });
    comedyMovies.forEach(movie => {
        const HTMLString = movieTemplate(movie);
        const html = document.implementation.createHTMLDocument()
        html.body.innerHTML = HTMLString;
        $containerComedy.append(html.body.children[0]);
    });
    animationMovies.forEach(movie => {
        const HTMLString = movieTemplate(movie);
        const html = document.implementation.createHTMLDocument()
        html.body.innerHTML = HTMLString;
        $containerAnimation.append(html.body.children[0]);
    });
    dramaMovies.forEach(movie => {
        const HTMLString = movieTemplate(movie);
        const html = document.implementation.createHTMLDocument()
        html.body.innerHTML = HTMLString;
        $containerDrama.append(html.body.children[0]);
    });
}
load();

async function showArtilcles() {
    const loadOk = await load();
    if(loadOk) {
        const $articles = document.querySelectorAll('.article__movie');
        const articles = [...$articles];    
        articles.forEach(article => {
            article.addEventListener('click', showDetails);
        })
    }    
}

function templateDetails(article) {
    const view = `
        <article class="article__details">
            <h1>${article.title}</h1>
            <span>Id: ${article.id}</span>
            <p>Synopsis: ${article.synopsis}</p>
            <div>
                <button>Rent</button>
                <button>Buy</button>
            </div>
        </article>
    `;

    return view;
}

function showDetails(ev) {
    console.log(ev);
}

showArtilcles();
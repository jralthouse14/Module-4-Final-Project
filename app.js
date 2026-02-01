const moviesWrapper = document.querySelector('.movies')
const searchName = document.querySelector(".searchName")

function openMenu () {
    document.body.classList.add('menu--open')
}

function closeMenu () {
    document.body.classList.remove('menu--open')
}

let currentMovies = []

function searchChange(event) {
    renderMovies(event.target.value)
    searchName.innerHTML = event.target.value
}

async function renderMovies(searchTerm) {
    document.querySelector('.movies__loading').style.opacity = '1';
    document.querySelector('.movies').innerText = '';

    const response = await fetch(`https://omdbapi.com/?s=${searchTerm}&apikey=e2320e00`)
    const data = await response.json()

    setTimeout(() => {
        document.querySelector('.movies__loading').style.opacity = '0';
        document.querySelector('.movies').innerText = '';
        currentMovies = data.Search
        displayMovies(currentMovies)
    }, 1000);
}

function displayMovies(movieList) {
    moviesWrapper.innerHTML = movieList.slice(0, 6).map((movie) => {
        return `
        <div class="movie">
          <img src=${movie.Poster} alt="">
          <h2>${movie.Title}</h2>
          <h4>${movie.Year}</h4>
          <button>Learn More</button>
        </div>
        `
    }).join("")
}

function sortChange(event) {
    const sortOption = event.target.value

    let sortedMovies = [...currentMovies]

    if (sortOption === "newest") {
        sortedMovies.sort((a, b) => b.Year - a.Year)
    } else if (sortOption ==="oldest") {
        sortedMovies.sort((a, b) => a.Year - b.Year)
    }

    displayMovies(sortedMovies)
}
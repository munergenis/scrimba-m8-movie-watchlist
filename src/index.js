import addedUrl from './assets/added.svg'
import addUrl from './assets/add.png'
import ratingStarUrl from './assets/rating-star.png'
import moviePlaceholderUrl from './assets/movie-placeholder.png'

const indexMainEl = document.querySelector("#index-main")
const searchBtn = document.querySelector("#search-btn")
const searchInput = document.querySelector("#search-input")

// Event Listeners
searchBtn.addEventListener("click", getSearchResults)
indexMainEl.addEventListener("click", handleIndexMainClick)

// Functions
function handleIndexMainClick(e) {
  const movieID = e.target.closest(".movie-article") && e.target.closest(".movie-article").id

  if (movieID && !(movieIsStored(movieID))) {
    const movieObjectPromise = getMovieObject(movieID)
    movieObjectPromise.then(pushMovieToLocalStorage)
    const addRemoveImgEl = e.target.closest(".movie-article").querySelector(".movie-add-remove-btn")
    const addedEl = e.target.closest(".movie-article").querySelector("#added")
    addRemoveImgEl.setAttribute("src", addedUrl)
    addedEl.textContent = "Added"
  }
}

function movieIsStored(id) {
  const moviesArr = JSON.parse(localStorage.getItem("movies")) || []
  return moviesArr.filter(movie => movie.imdbID === id).length > 0
}

async function getMovieObject(movieID) {
  const resp = await fetch(`https://www.omdbapi.com/?apikey=9c38210&i=${movieID}`)
  const data = await resp.json()
  return data
}

function pushMovieToLocalStorage(data) {
  const savedMoviesArr = JSON.parse(localStorage.getItem("movies")) || []
  savedMoviesArr.unshift({
    title: data.Title, 
    imdbRating: data.imdbRating,
    imdbID: data.imdbID,
    runtime: data.Runtime, 
    genre: data.Genre,
    plot: data.Plot,
    poster: data.Poster,
  })
  localStorage.setItem("movies", JSON.stringify(savedMoviesArr))
}

function getSearchResults() {
  if (searchInput.value) {
    fetch(`https://www.omdbapi.com/?apikey=9c38210&s=${searchInput.value}&type=movie`)
      .then(resp => resp.json())
      .then(data => {
        if (data.Response === "True") {
          const movieTitlesArr = []
          data.Search.forEach(movie => movieTitlesArr.push(movie.Title))

          renderMoviesHtml(movieTitlesArr)
        } else {
          indexMainEl.innerHTML = getNotFoundHtml()
        }
      })
  } else {
    indexMainEl.innerHTML = getEmptyPlaceholderHtml()
  }
}

function renderMoviesHtml(movieTitlesArr) {
  indexMainEl.innerHTML = ""
  movieTitlesArr.forEach(movie => {
    fetch(`https://www.omdbapi.com/?apikey=9c38210&t=${movie}`)
      .then(resp => resp.json())
      .then(data => {
        const {
          Title, 
          imdbRating,
          imdbID,
          Runtime, 
          Genre,
          Plot,
          Poster
        } = data

        indexMainEl.innerHTML += getMovieHtml(Title, imdbRating, imdbID, Runtime, Genre, Plot, Poster)
      })
  })
}

function getMovieHtml(title, rating, id, runtime, genre, plot, poster) {
  let buttonHtml = ""
  if (movieIsStored(id)) {
    buttonHtml = `
      <button class="add-remove-cont">
        <img class="add-remove-btn movie-add-remove-btn" src="${addedUrl}" alt="Added movie">
      </button>
      <p class="movie-p" id="added">Added</p>
    `
  } else {
    buttonHtml = `
      <button class="add-remove-cont">
        <img class="add-remove-btn movie-add-remove-btn" src="${addUrl}" alt="Add movie">
      </button>
      <p class="movie-p" id="added">Watchlist</p>
    `
  }
  return `
    <article class="movie-article" id="${id}">
      <img class="movie-poster" src="${poster}" alt="${title} movie poster">
      <div class="movie-body">
        <div class="movie-header">
          <h2 class="movie-h2">${title}</h2>
          <div class="movie-rating">
            <img src="${ratingStarUrl}" alt="Rating star">
            <p class="movie-p">${rating}</p>
          </div>
        </div>
        <div class="movie-specs">
          <p class="movie-p">${runtime}</p>
          <p class="movie-p">${genre}</p>
          <div class="movie-add-remove">
            ${buttonHtml}
          </div>
        </div>
        <div class="movie-desc">
          <p class="movie-desc-p">${plot}</p>
        </div>
      </div>
    </article>
    <hr>
  `
}

function getNotFoundHtml() {
  return `
    <div class="main-placeholder">
      <p class="placeholder-ligth-p">Unable to find what you're looking for. Please try another search.</p>
    </div>
  `
}

function getEmptyPlaceholderHtml() {
  return `
    <div class="main-placeholder">
      <img class="placeholder-img" src="${moviePlaceholderUrl}" alt="Movie placeholder icon">
      <p class="placeholder-p">Start exploring</p>
    </div>
  `
}
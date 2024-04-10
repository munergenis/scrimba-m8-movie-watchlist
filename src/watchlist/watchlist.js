import addUrl from '../assets/add.png'
import removeUrl from '../assets/remove.png'
import ratingStarUrl from '../assets/rating-star.png'

const watchlistMainEl = document.querySelector("#watchlist-main")
const storedMoviesArr = JSON.parse(localStorage.getItem("movies"))
const searchBtn = document.querySelector("#search-btn")
const searchInput = document.querySelector("#search-input")

if (storedMoviesArr) {
  renderStoredMovies()
}

// Event Listeners
watchlistMainEl.addEventListener("click", handleWatchlistMainClick)
searchBtn.addEventListener("click", handleSearchClick)

// Functions
function handleSearchClick() {
  const searchStr = searchInput.value && searchInput.value.toLowerCase()
  if (searchStr) {
    const filteredMoviesArray = getFilteredArr(searchStr)
    if (filteredMoviesArray.length > 0) {
      renderFilteredMovies(filteredMoviesArray)
      searchInput.value = ""
    } else {
      renderNotFoundHtml()
    }
  } else {
    renderStoredMovies()
  }
}

function renderNotFoundHtml() {
  watchlistMainEl.innerHTML = `
    <div class="main-placeholder">
      <p class="placeholder-ligth-p">Unable to find what you're looking for. Please try another search.</p>
    </div>
  `
}

function getFilteredArr(str) {
  return storedMoviesArr.filter(movie => movie.title.toLowerCase().includes(str))
}

function renderFilteredMovies(arr) {
  renderMovies(arr)
}

function handleWatchlistMainClick(e) {
  const movieID = e.target.closest(".movie-add-remove") && e.target.closest(".movie-add-remove").id
  if (movieID) {
    removeMovieFromArr(movieID)
    if (storedMoviesArr.length > 0) {
      storeNewArr()
      renderStoredMovies()
    } else {
      localStorage.removeItem("movies")
      renderEmptyPlaceholderHtml()
    }
  }
}

function renderEmptyPlaceholderHtml() {
  watchlistMainEl.innerHTML = `
    <div class="main-placeholder">
      <p class="placeholder-ligth-p">Your watchlist is looking a little empty...</p>
      <a class="placeholder-link" href="../index.html">
        <img class="add-remove-btn" src="${addUrl}" alt="Add movie icon">
        <p>Let's add some movies!</p>
      </a>
    </div>
  `
}

function storeNewArr() {
  localStorage.setItem("movies", JSON.stringify(storedMoviesArr))
}

function removeMovieFromArr(id) {
  const index = storedMoviesArr.findIndex(movie => movie.imdbID === id)
  storedMoviesArr.splice(index, 1)
}

function renderStoredMovies() {
  renderMovies(storedMoviesArr)
}

function renderMovies(arr) {
  let moviesHtml = ""
  arr.forEach(movie => moviesHtml += getMovieHtml(movie))
  watchlistMainEl.innerHTML = moviesHtml
}

function getMovieHtml(movie) {
  const {
    title, 
    imdbRating: rating,
    imdbID: id,
    runtime, 
    genre,
    plot,
    poster
  } = movie
  return `
    <article class="movie-article">
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
          <div class="movie-add-remove"  id="${id}">
            <button class="add-remove-cont">
              <img class="add-remove-btn movie-add-remove-btn" src="${removeUrl}" alt="Remove movie">
            </button>
            <p class="movie-p">Remove</p>
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
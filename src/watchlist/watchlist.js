const watchlistMainEl = document.querySelector("#watchlist-main")
const storedMoviesArr = JSON.parse(localStorage.getItem("movies"))

if (storedMoviesArr) {
  renderStoredMovies()
}

// Event Listeners
watchlistMainEl.addEventListener("click", handleWatchlistMainClick)

// Functions
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
      <img class="placeholder-img" src="/movie-placeholder.png" alt="Movie placeholder icon">
      <p class="placeholder-p">Start exploring</p>
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
  let moviesHtml = ""
  storedMoviesArr.forEach(movie => moviesHtml += getMovieHtml(movie))
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
            <img src="/rating-star.png" alt="Rating star">
            <p class="movie-p">${rating}</p>
          </div>
        </div>
        <div class="movie-specs">
          <p class="movie-p">${runtime}</p>
          <p class="movie-p">${genre}</p>
          <div class="movie-add-remove"  id="${id}">
            <button class="add-remove-cont">
              <img class="add-remove-btn movie-add-remove-btn" src="/remove.png" alt="Remove movie">
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
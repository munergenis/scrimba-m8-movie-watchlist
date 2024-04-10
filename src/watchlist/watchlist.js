const watchlistMainEl = document.querySelector("#watchlist-main")
const storedMoviesArr = JSON.parse(localStorage.getItem("movies"))

if (storedMoviesArr) {
  renderStoredMovies()
}

function renderStoredMovies() {
  let moviesHtml = ""
  storedMoviesArr.forEach(movie => {
    moviesHtml += getMovieHtml(movie)
  })
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
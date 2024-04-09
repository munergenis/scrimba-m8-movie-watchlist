const indexMainEl = document.querySelector("#index-main")
const searchBtn = document.querySelector("#search-btn")
const searchInput = document.querySelector("#search-input")

// Event Listeners
searchBtn.addEventListener("click", getSearchResults)
indexMainEl.addEventListener("click", handleIndexMainClick)

function handleIndexMainClick(e) {
  const movieID = e.target.closest(".movie-article") ? e.target.closest(".movie-article").id : null
  if (movieID) {
    console.log(movieID)
  }
}

// Functions
function getSearchResults() {
  if (searchInput.value) {
    fetch(`http://www.omdbapi.com/?apikey=9c38210&s=${searchInput.value}&type=movie`)
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
    fetch(`http://www.omdbapi.com/?apikey=9c38210&t=${movie}`)
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
  return `
    <article class="movie-article" id="${id}">
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
          <div class="movie-add-remove">
            <button class="add-remove-cont">
              <img class="add-remove-btn movie-add-remove-btn" src="/add.png" alt="Add movie">
            </button>
            <p class="movie-p">Watchlist</p>
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
      <img class="placeholder-img" src="/movie-placeholder.png" alt="Movie placeholder icon">
      <p class="placeholder-p">Start exploring</p>
    </div>
  `
}
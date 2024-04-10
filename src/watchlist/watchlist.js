const watchlistMainEl = document.querySelector("#watchlist-main")
const storedMoviesArr = JSON.parse(localStorage.getItem("movies"))

if (storedMoviesArr) {
  let moviesHtml = ""
  storedMoviesArr.forEach(movie => {
    const {
      title, 
      imdbRating: rating,
      imdbID: id,
      runtime, 
      genre,
      plot,
      poster
    } = movie
    moviesHtml += `
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
  })
  watchlistMainEl.innerHTML = moviesHtml
}
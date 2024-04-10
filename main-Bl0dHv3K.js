import{r as A,a as g}from"./rating-star-DKmvcNgh.js";const d="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%3e%3c!--!Font%20Awesome%20Free%206.5.2%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202024%20Fonticons,%20Inc.--%3e%3cpath%20fill='%2363E6BE'%20d='M256%20512A256%20256%200%201%200%20256%200a256%20256%200%201%200%200%20512zM369%20209L241%20337c-9.4%209.4-24.6%209.4-33.9%200l-64-64c-9.4-9.4-9.4-24.6%200-33.9s24.6-9.4%2033.9%200l47%2047L335%20175c9.4-9.4%2024.6-9.4%2033.9%200s9.4%2024.6%200%2033.9z'/%3e%3c/svg%3e",h="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAA+CAYAAACWX20oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKESURBVHgB7Zu/ctNAEId3TyloMiOqjDvRZvyPN3A6OkxJlfAETJ4A0tEBJRXxW9DFdJSylCIdKp0KlTATW+zZckZRspJGE2sc+/cVtrSn1dx81kk7pzNTDs/ru/v7syGRec1MfRui7SROEvKJ5qMwDM/zjZzdabfbA2Oc77S9MjSi+ZzfXV7641XgVky32z2W3XPaafgkCPzRYst+pFfKBQGSK+fIXjkLMd1u7zft3vDRiIzhl6bT6ZwQpGTxZrPZ0MjT55jAHZh5aNJHMrgD9/bk0y05Kn3eZ9KWMgvzJGdMDVCnLxVyvD0qwUoJw8lRNpberItOHOVz1kWdvnQ6vQuRMyjIIUPgQSBGAWIUIEYBYhQgRgFiFErrGHneezIl8TEXLisKNwn3gf57ZUmlYpYn4Q/0dHHr9B9DSQFiFCBGAWIUIEYBYhQgRqFKHePLK4XTbMCYpOylnGsng6gZvJL2WPr/JhuQ/n+Wr8Ip3SozeHH2DZ1FZs3K0tyyGbIGudd/+dFi5uIkDCUFiFGAGAWIUYAYBYhRgBgFlpokoccnCoLJC2qAdS1hwRWjADEKEKMAMQoQowAxChCjUGWiqtZSs02ixlIzWtdSs00CS80eE4hRgBgFiFGAGAWIUYAYhSoTVZFUM6Nc2nsqrmNiyflKjVCnL2z/ceNR0VlFzB96WmvqmiA2+XIfLKt9w5z8JJCDR0b4QotxCFIix6GxM51O/x4ctP5J4BUBgc8mE/+HYzevr6e/RI5dGDGgnYbPgsD/ZLecVUjkjHdbDp+upFicbJOV02q1RkmSPJcDPQk9o+3G1jjf5D771g6fbEPhuqLDw37fmO2scW5uKLq68iOt/T+pzL06TWgrJQAAAABJRU5ErkJggg==",r=document.querySelector("#index-main"),u=document.querySelector("#search-btn"),l=document.querySelector("#search-input");u.addEventListener("click",S);r.addEventListener("click",f);function f(e){const t=e.target.closest(".movie-article")&&e.target.closest(".movie-article").id;if(t&&!m(t)){b(t).then(I);const i=e.target.closest(".movie-article").querySelector(".movie-add-remove-btn"),s=e.target.closest(".movie-article").querySelector("#added");i.setAttribute("src",d),s.textContent="Added"}}function m(e){return(JSON.parse(localStorage.getItem("movies"))||[]).filter(o=>o.imdbID===e).length>0}async function b(e){return await(await fetch(`https://www.omdbapi.com/?apikey=9c38210&i=${e}`)).json()}function I(e){const t=JSON.parse(localStorage.getItem("movies"))||[];t.unshift({title:e.Title,imdbRating:e.imdbRating,imdbID:e.imdbID,runtime:e.Runtime,genre:e.Genre,plot:e.Plot,poster:e.Poster}),localStorage.setItem("movies",JSON.stringify(t))}function S(){l.value?fetch(`https://www.omdbapi.com/?apikey=9c38210&s=${l.value}&type=movie`).then(e=>e.json()).then(e=>{if(e.Response==="True"){const t=[];e.Search.forEach(o=>t.push(o.Title)),w(t)}else r.innerHTML=M()}):r.innerHTML=E()}function w(e){r.innerHTML="",e.forEach(t=>{fetch(`https://www.omdbapi.com/?apikey=9c38210&t=${t}`).then(o=>o.json()).then(o=>{const{Title:i,imdbRating:s,imdbID:n,Runtime:a,Genre:c,Plot:v,Poster:p}=o;r.innerHTML+=R(i,s,n,a,c,v,p)})})}function R(e,t,o,i,s,n,a){let c="";return m(o)?c=`
      <button class="add-remove-cont">
        <img class="add-remove-btn movie-add-remove-btn" src="${d}" alt="Added movie">
      </button>
      <p class="movie-p" id="added">Added</p>
    `:c=`
      <button class="add-remove-cont">
        <img class="add-remove-btn movie-add-remove-btn" src="${g}" alt="Add movie">
      </button>
      <p class="movie-p" id="added">Watchlist</p>
    `,`
    <article class="movie-article" id="${o}">
      <img class="movie-poster" src="${a}" alt="${e} movie poster">
      <div class="movie-body">
        <div class="movie-header">
          <h2 class="movie-h2">${e}</h2>
          <div class="movie-rating">
            <img src="${A}" alt="Rating star">
            <p class="movie-p">${t}</p>
          </div>
        </div>
        <div class="movie-specs">
          <p class="movie-p">${i}</p>
          <p class="movie-p">${s}</p>
          <div class="movie-add-remove">
            ${c}
          </div>
        </div>
        <div class="movie-desc">
          <p class="movie-desc-p">${n}</p>
        </div>
      </div>
    </article>
    <hr>
  `}function M(){return`
    <div class="main-placeholder">
      <p class="placeholder-ligth-p">Unable to find what you're looking for. Please try another search.</p>
    </div>
  `}function E(){return`
    <div class="main-placeholder">
      <img class="placeholder-img" src="${h}" alt="Movie placeholder icon">
      <p class="placeholder-p">Start exploring</p>
    </div>
  `}

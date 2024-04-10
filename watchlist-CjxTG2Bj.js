import{a as A,r as p}from"./rating-star-DKmvcNgh.js";const h="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJSSURBVHgB3ZqBUSoxEIb/Y14BvA5CBQ8reFCBLdiBdoBWIB2AFagVgBWIFVw6kA7W3UuCBwNKQnIkfDM7OJxw+dnsZrO5CpEgIsUvI7Z/9rXfMoe2tmL7YFtWVaVxbnjwfbYJW03h1GyP9ofoXMCIbUHxmXUiSG7C9kzpmSUTxF98y/ZJ3VGz3SAmZObwuXg8ZozVLwIk4yzYhjgvkuXGnOHWh/7hoJCMRDh+FPOTkHfkI8KxYiFX+y709r1p52VuIoThsTEjIm4of+52x13tiFAwcaGQNxInV+3yZndqTZC/CEES0dYU23jEeqNGWUgWW8ofbY9MUB6bMTceKdQbjr+ytjiP3KFcmrE7j4g3FMpEs0cGVeHTyqFkao1QPmMRkmMp4svwD0yzIBSNuCiE8b8JdPJHtrt9RIbCt9K1BDvBjyZLIBH2B5IthPL42LoHf16RELtx8r1HP0RIloiQtednrlPEx+494EmIEMU2owR9JzKdy2f4Zy8twX7K3lwjLgphLGUdeUO4EIU8+JCptUL5rC6laBz07AZeo1xkgdZuHXlCuTSLp9tYybrwiTIZbDxiy4IlymPuelvtdtAIpjlXEgMnZFNr2f7QC8ph3u407muZykqfupY6FQ3TnNPuja3q1154QP48HHWszZ6ZUr5M9435sg96LGPkVYc1R2+HLl7MYehR0HljZoqYkDmSq6k75OGENM11Mn2nOaVHelsKqUkoaEGmVOoWK0jip6ZwarZ7OrEzUyES9P3gmWQ46ScrbO/p1y2TPoFkomgPnn0BOBhx25RscJAAAAAASUVORK5CYII=",r=document.querySelector("#watchlist-main"),i=JSON.parse(localStorage.getItem("movies")),g=document.querySelector("#search-btn"),s=document.querySelector("#search-input");i&&a();r.addEventListener("click",M);g.addEventListener("click",u);function u(){const e=s.value&&s.value.toLowerCase();if(e){const t=I(e);t.length>0?(y(t),s.value=""):f()}else a()}function f(){r.innerHTML=`
    <div class="main-placeholder">
      <p class="placeholder-ligth-p">Unable to find what you're looking for. Please try another search.</p>
    </div>
  `}function I(e){return i.filter(t=>t.title.toLowerCase().includes(e))}function y(e){l(e)}function M(e){const t=e.target.closest(".movie-add-remove")&&e.target.closest(".movie-add-remove").id;t&&(U(t),i.length>0?(S(),a()):(localStorage.removeItem("movies"),E()))}function E(){r.innerHTML=`
    <div class="main-placeholder">
      <p class="placeholder-ligth-p">Your watchlist is looking a little empty...</p>
      <a class="placeholder-link" href="../index.html">
        <img class="add-remove-btn" src="${A}" alt="Add movie icon">
        <p>Let's add some movies!</p>
      </a>
    </div>
  `}function S(){localStorage.setItem("movies",JSON.stringify(i))}function U(e){const t=i.findIndex(o=>o.imdbID===e);i.splice(t,1)}function a(){l(i)}function l(e){let t="";e.forEach(o=>t+=b(o)),r.innerHTML=t}function b(e){const{title:t,imdbRating:o,imdbID:n,runtime:c,genre:d,plot:m,poster:v}=e;return`
    <article class="movie-article">
      <img class="movie-poster" src="${v}" alt="${t} movie poster">
      <div class="movie-body">
        <div class="movie-header">
          <h2 class="movie-h2">${t}</h2>
          <div class="movie-rating">
            <img src="${p}" alt="Rating star">
            <p class="movie-p">${o}</p>
          </div>
        </div>
        <div class="movie-specs">
          <p class="movie-p">${c}</p>
          <p class="movie-p">${d}</p>
          <div class="movie-add-remove"  id="${n}">
            <button class="add-remove-cont">
              <img class="add-remove-btn movie-add-remove-btn" src="${h}" alt="Remove movie">
            </button>
            <p class="movie-p">Remove</p>
          </div>
        </div>
        <div class="movie-desc">
          <p class="movie-desc-p">${m}</p>
        </div>
      </div>
    </article>
    <hr>
  `}

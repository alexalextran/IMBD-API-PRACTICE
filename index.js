const movieslist = document.querySelector(".movie__list")




async function search(){
    const searchvalue = document.getElementById('searchBar').value
    const searchyear = document.getElementById('searchBar__year').value
    var searchtype = document.getElementById("filter").value;

    const movies = await fetch(`http://www.omdbapi.com/?apikey=749ea3ae&s=${searchvalue}&y=${searchyear}&type=${searchtype}`)
    const moviesData = await movies.json()

    var hi = moviesData.Search.map((movie)=> movieHTML(movie)).join('')

movieslist.innerHTML = hi



    console.log(moviesData)
}


function movieHTML(movie){


    
var movieobject =
    `<div class="movie" onclick="changeid('${movie.imdbID}')">
    <div>
    <img class="poster" src = "${movie.Poster}" ">
    </div>

    <h3 class="movie__title">
        ${movie.Title}
    </h3>

    <p class="release__date">
    ${movie.Year}
    </p>

    <p class="release__date">
    ${movie.Type}
    </p>

    <p class="short__desc">
    ${movie.imdbID}
    </p>
</div>`

return movieobject
}


function changeid(id){
    localStorage.setItem("id", id)
    window.location.href = "movie.html"
}
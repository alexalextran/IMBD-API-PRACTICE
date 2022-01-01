const movieslist = document.querySelector(".movie__list")



async function search(){
    const searchvalue = document.getElementById('searchBar').value

    const movies = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=749ea3ae&s=${searchvalue}`)
    const moviesData = await movies.json()

    var hi = moviesData.Search.map((movie)=> movieHTML(movie)).join('')

movieslist.innerHTML =hi



    console.log(moviesData)
}



function movieHTML(movie){
    
var movieobject =
    `<div class="movie">
    <div class="img">
    <img src = "${movie.Poster}" style="width:270px; height:400px">
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
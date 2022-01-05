const movieslist = document.querySelector(".movie__list")
let error_notification = false




async function search(event){
    event.preventDefault();
    const searchvalue = document.getElementById('searchBar').value
    const searchyear = document.getElementById('searchBar__year').value
    var searchtype = document.getElementById("filter").value;
try{
    const movies = await fetch(`http://www.omdbapi.com/?apikey=749ea3ae&s=${searchvalue}&y=${searchyear}&type=${searchtype}`)
    const moviesData = await movies.json()
    console.log(error_notification)
    var hi = moviesData.Search.map((movie)=> movieHTML(movie)).join('')
        
    
                if(error_notification===true){
                     error_notification = false
                        console.log(error_notification)
                     
                        document.getElementById('phrog').style.cssText =
                        `
                        transform: rotate(0deg) translateX(0px);
                        `

                        document.getElementById('uh-oh').style.cssText =
                        `
                        opacity: 0;
                        `
                                
                            
        
                }





movieslist.innerHTML = hi


            



    console.log(moviesData)
}

                catch(e){

                 error_notification = true
                    
                    console.log(error_notification)

                if (error_notification == true)  {
                                        document.getElementById('phrog').style.cssText =
                                        `
                                        transform: rotate(30deg) translateX(130px);
                                        `

                                        document.getElementById('uh-oh').style.cssText =
                                        `
                                        opacity: 1;
                                        `
                                                 }
                                            
                        }

          
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
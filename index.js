const movieslist = document.querySelector(".movie__list")
let error_notification = false
let render_succsessful = false




async function search(event){

    
    event.preventDefault();
    const searchvalue = document.getElementById('searchBar').value
    const searchyear = document.getElementById('searchBar__year').value
    var searchtype = document.getElementById("filter").value;

    if(render_succsessful == true){
        movieslist.innerHTML = "";
        render_succsessful = false
    }




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




if(render_succsessful == false){
movieslist.innerHTML = hi
render_succsessful = true
}




            



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

function movie_poster(poster){
    if(poster == "N/A"){
        return `<img style="width:200px; height:200px;"src="/assets/missingpng.png">`
    }
    
    return `<img class="poster" src = "${poster}">`

   
}


function movieHTML(movie){


    
var movieobject =
    `<div class="movie" onclick="changeid('${movie.imdbID}')">
    <div>
    ${movie_poster(movie.Poster)}
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
</div>`

return movieobject
}


function changeid(id){
    localStorage.setItem("id", id)
    window.location.href = "movie.html"
}
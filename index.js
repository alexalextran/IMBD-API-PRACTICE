const movieslist = document.querySelector(".movie__list")
const selector = document.querySelector(".page__selector")
let error_notification = false
let render_succsessful = false





async function search(event){

    
    event.preventDefault();


    if(render_succsessful == true){
        movieslist.innerHTML = "";
        selector.innerHTML = ""
        render_succsessful = false
    }


try{
    
    const searchvalue = document.getElementById('searchBar').value
const searchyear = document.getElementById('searchBar__year').value
var searchtype = document.getElementById("filter").value;
    var movies = await fetch(`http://www.omdbapi.com/?apikey=749ea3ae&s=${searchvalue}&y=${searchyear}&type=${searchtype}`)
    var moviesData = await movies.json()
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
selector.innerHTML = page__selector()
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

return  `<div class="movie" onclick="changeid('${movie.imdbID}')">

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


}


function page__selector(){
    return `
    
    <a   id="prev" onclick="page__decrease()"> <<< Previous Page</a> <p  id="page__number">1</p> <a onclick="page__increase(event)" id="forw">Next Page >>></a>

    `
}

var page = 1


async function page__increase(event){
    console.log('work')
    
    page++
    
    const page__number = document.getElementById('page__number')
    page__number.innerHTML = page

    const searchvalue = document.getElementById('searchBar').value
    const searchyear = document.getElementById('searchBar__year').value
    var searchtype = document.getElementById("filter").value;
        const movies = await fetch(`http://www.omdbapi.com/?apikey=749ea3ae&s=${searchvalue}&y=${searchyear}&type=${searchtype}&page=${page}`)
       
        const moviesData = await movies.json()
        const maxpage = (Math.ceil(moviesData.totalResults / 10))
               console.log(maxpage)

       
       

        if(page==maxpage){ 
            document.getElementById('forw').style.cssText =
                                        `
                                        color: black;
                                        text-decoration: none;
                                        cursor: default;
                                        pointer-events: none;
                                        `

        event.preventDefault()

             
        }
        else{
            document.getElementById('forw').style.cssText =
            `
            color: blue;
            text-decoration: underline;
            cursor: pointer;
            `
            
        }
            

        var hi = moviesData.Search.map((movie)=> movieHTML(movie)).join('')
        movieslist.innerHTML = hi
}

async function page__decrease(){
    console.log('work')
    page--
    
    const page__number = document.getElementById('page__number')
    page__number.innerHTML = page

    const searchvalue = document.getElementById('searchBar').value
    const searchyear = document.getElementById('searchBar__year').value
    var searchtype = document.getElementById("filter").value;
        const movies = await fetch(`http://www.omdbapi.com/?apikey=749ea3ae&s=${searchvalue}&y=${searchyear}&type=${searchtype}&page=${page}`)
       
        const moviesData = await movies.json()
        const maxpage = (Math.ceil(moviesData.totalResults / 10))
               console.log(maxpage)

       
       

        if(page==1){ 
            document.getElementById('prev').style.cssText =
                                        `
                                        color: black;
                                        text-decoration: none;
                                        cursor: default;
                                        `

             
        }
        else{
            document.getElementById('prev').style.cssText =
                                        `
                                        color: blue;
                                        text-decoration: underline;
                                        cursor: pointer;
                                        `
             document.getElementById('forw').style.cssText =
                                        `
                                        color: blue;
                                        text-decoration: underline;
                                        cursor: pointer;
                                        `
                                        

            
        }
            

        var hi = moviesData.Search.map((movie)=> movieHTML(movie)).join('')
        movieslist.innerHTML = hi
}








function changeid(id){
    localStorage.setItem("id", id)
    window.location.href = "movie.html"
}
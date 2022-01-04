var id = localStorage.getItem("id")
const movie__card = document.querySelector(".movie__card")

async function renderdesc(id) {
  
    
     const moviedetailed = await fetch(`http://www.omdbapi.com/?apikey=749ea3ae&i=${id}&plot=full`)
     const moviesDatadetailed = await moviedetailed.json()



 lol = detailedmovieHTML(moviesDatadetailed)
   
 
movie__card.innerHTML = lol
     

    

    console.log(moviesDatadetailed)
}

function detailedmovieHTML(desc){
    var xd =

    `<div class="movie__card--header">
            

    <div class="movie__poster--wrapper">
        <img src="${desc.Poster}" alt="" class="movie__poster--large">

        <div class="genre__wapper">
        <ul class="movie__genres">
        ${genresplitter(desc.Genre)}
        </ul>
        </div>
    </div>
   
    
    <div class="movie__card--text">

        <h2 class="movie__card--title">
        ${desc.Title}
        </h2>
        
        <div class="movie__card--info">
            <p>
                Released: ${desc.Released}
            </p>

            <p>
                Rated: ${desc.Rated}
            </p>

           

            <p>
                Runtime: ${desc.Runtime}
            </p>

            <p>
                Country: ${desc.Country}
            </p>

            <p>
            Language: ${desc.Country}
             </p>

             <p>
             Type: ${desc.Type  }
              </p>
        </div>

        

        <h4 class="awards"> Awards: ${desc.Awards} </p>
        
    </div>

    <div class="movie__card--description">

    <div class="movie__card--para">
    <p >${desc.Plot}</p>
    </div>

    <div class="moive__card--rating">
        <ul class="ratings">
            ${ratingexist(desc.Ratings)}
           
        
        </ul>
    </div>
    

    

        <p class="movie__people border__bottom"> <span class="green">Directors:</span> ${desc.Director}

       

        <p class="movie__people border__bottom"> <span class="green">Writers:</span> ${desc.Writer} </p>
      
       

        <p class="movie__people"> <span class="green">Actors:</span> ${desc.Actors} </p>

        

    </div>
    

  


        




</div>

    `
console.log(desc.Actors)
        return xd
}

function genresplitter(string){
    const myArray = string.split(", ");
    console.log(myArray)

    var hey = ""
    
    switch(myArray.length) {
        case 1:

          hey =  `<li class="genre">
                    ${myArray[0]}
                </li>`

          break;

        case 2:
          
           hey = `<li class="genre">
            ${myArray[0]}
        </li>

        <li class="genre">
            ${myArray[1]}
        </li>

        `
          break;

          case 3:
         
            hey = `<li class="genre">
            ${myArray[0]}
        </li>

        <li class="genre">
            ${myArray[1]}
        </li>

        <li class="genre">
            ${myArray[2]}
        </li>
             `

          break;

          case 4:
         
            hey = `<li class="genre">
            ${myArray[0]}
        </li>

        <li class="genre">
            ${myArray[1]}
        </li>

        <li class="genre">
            ${myArray[2]}
        </li>

        <li class="genre">
        ${myArray[3]}
         </li>
             `
    }

          return hey

}

function ratingexist(desc){
   
    var hey = ""
    
    switch(desc.length) {
        case 1:

          hey = `<li class="rates">
          DBMI : ${(desc[0]).Value}
      </li>`

      console.log((desc[0]).Value)

          break;

        case 2:
          
            hey = `<li class="rates">
            DBMI  ${(desc[0].Value)}
        </li>
        
        <li class="rates">
        Rotten tomatoes <img class="tomato" src="/assets/1009px-Rotten_Tomatoes.svg.png">${(desc[1].Value)}
        </li>
        
        `
          break;

          case 3:
         
            hey = `<li class="rates">
            DBMI ${(desc[0].Value)}
        </li>
        
        <li class="rates" style="display:flex; flex-direction: column">
        <p class="rt"> Rotten tomatoes </p>
        <p>  <img class="tomato" src="/assets/1009px-Rotten_Tomatoes.svg.png"> ${(desc[1].Value)}</p>
        </li>

        <li class="rates">
        Metacritic ${(desc[1].Value)}
        </li>
        `

          break;


        default: hey =  `<li class="rates">
        DBMI : 
    </li>
    
    <li class="rates">
    Rotten tomatoes : 
    </li>

    <li class="rates">
    Metacritic : 
    </li>
    `
      }


      return hey


        

   


  
      }

   


renderdesc(id)
let readmore = false
let readoption =  document.querySelector(".movie__card--para")

function read__more(){
    let readoption =  document.querySelector(".movie__card--para")

   if (readmore) {
    readmore = false;
    return readoption.classList.remove("read__more--effect");
     }

   

      readmore = true;
  
    var classes = readoption.classList
      classes.add("read__more--effect")


      let readlessoption =  document.querySelector(".read__less")
      var classess = readlessoption.classList
      document.getElementById('rl__wrapper').style.opacity = "1";
      
    
} 



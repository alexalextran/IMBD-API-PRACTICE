var id = localStorage.getItem("id")
const movie__card = document.querySelector(".movie__card")

async function renderdesc(id) {
  
    
     const moviedetailed = await fetch(`http://www.omdbapi.com/?apikey=749ea3ae&i=${id}`)
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

        <ul class="movie__genres">
        ${desc.Genre}
        </ul>
    </div>
   
    
    <div class="movie__card--text">

        <h2 class="movie__card--title">
        ${desc.Title}
        </h2>
        
        <div class="movie__card--info">
            <p class="release__date">
                Released: ${desc.Released}
            </p>

            <p class="rated">
                Rated: ${desc.Rated}
            </p>

           

            <p class="run-time">
                Runtime: ${desc.Runtime}
            </p>
        </div>

        
    </div>

    <div class="moive__card--description">
    <p>${desc.Plot}</p>

    <div class="moive__card--rating">
        <ul class="ratings">

            ${ratingexist(desc.Ratings)}
           

         

          
            
        </ul>
    </div>
</div>



</div>

    `

        return xd
}


function ratingexist(desc){
   
    var hey = ""
    
    switch(desc.length) {
        case 1:

          hey = `<li>
          DBMI : ${(desc[0]).Value}
      </li>`

      console.log((desc[0]).Value)

          break;

        case 2:
          
            hey = `<li>
            DBMI : ${(desc[0].Value)}
        </li>
        
        <li>
        rotten tomatoes : ${(desc[1].Value)}
        </li>
        
        `
          break;

          case 3:
         
            hey = `<li>
            DBMI : ${(desc[0].Value)}
        </li>
        
        <li>
        rotten tomatoes : ${(desc[1].Value)}
        </li>

        <li>
        Metacritic : ${(desc[1].Value)}
        </li>
        `

          break;


        default: hey =  `<li>
        DBMI : 
    </li>
    
    <li>
    rotten tomatoes : 
    </li>

    <li>
    Metacritic : 
    </li>
    `
          // code block
      }


      return hey


        

   


  
      }

   


renderdesc(id)

function test(){
    console.log("hi")
}
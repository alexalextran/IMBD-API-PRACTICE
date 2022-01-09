const movieslist = document.querySelector(".movie__list")
const selector = document.querySelector(".page__selector")   
 const loading = document.querySelector(".movies__overlay--loading");
let error_notification = false
let render_succsessful = false
var page = 1



async function search(event){

    event.preventDefault();

    //clears all pre-existing movies whenever the user clicks search
  if(render_succsessful){
        movieslist.innerHTML = "";
        selector.innerHTML = ""
        render_succsessful = false
    }

    loading.classList += " modal__overlay--visible";


try{
    const searchvalue = document.getElementById('searchBar').value
    const searchyear = document.getElementById('searchBar__year').value
   
    
    var searchtype = document.getElementById("filter").value;
    var movies = await fetch(`https://www.omdbapi.com/?apikey=749ea3ae&s=${searchvalue}&y=${searchyear}&type=${searchtype}`)
    var moviesData = await movies.json()

    
        loading.classList.remove("modal__overlay--visible");
    

    //results only in lots of 10
    const maxpage = (Math.ceil(moviesData.totalResults / 10))
    page = 1


   
    var moviesDataHTML = moviesData.Search.map((movie)=> movieHTML(movie)).join('')
        
                    //if statement that ensures the frog animation i.e erorr message does not show if a movie is found
                if(error_notification){
                     error_notification = false
                     
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
                        // renders movies and allows for multiple movies to be rendered before page is refreshed
                     movieslist.innerHTML = moviesDataHTML
                
                    selector.innerHTML = page__selector()
                    render_succsessful = true
                        // if statement that disables the forward button if the max number of pages is only 1
                    if (maxpage == 1){
                        document.getElementById('forw').style.cssText =
                        `
                        color: black;
                        text-decoration: none;
                        cursor: none;
                        pointer-events: none;
                        `
                        }

    }
                                            }

                catch(e){
                 error_notification = true
                 console.log(e)
        
                 // if statment that displays error message if there is an issue
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

// if image poster is not avliable, error image shows
function movie_poster(poster){
    if(poster == "N/A"){
        return `<img style="width:200px; height:200px;"src="assets/missingpng.png">`
    }
    return `<img class="poster" src = "${poster}">`
}



// HTML template for rendering movies
function movieHTML(movie){

return  `
<div class="movie" onclick="changeid('${movie.imdbID}')">

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

//renders page forward and backward
function page__selector(){
    return `
    
    <a   id="prev" onclick="page__decrease()"> <i class="fas fa-arrow-left"></i> Previous Page</a> <p  id="page__number">1</p> <a onclick="page__increase(event)" id="forw">Next Page <i class="fas fa-arrow-right"></i></a>

    `
}



// increases page number and renders results
async function page__increase(){
  
    page++
    const page__number = document.getElementById('page__number')
    page__number.innerHTML = page
    const searchvalue = document.getElementById('searchBar').value
    const searchyear = document.getElementById('searchBar__year').value
    var searchtype = document.getElementById("filter").value;
        const movies = await fetch(`https://www.omdbapi.com/?apikey=749ea3ae&s=${searchvalue}&y=${searchyear}&type=${searchtype}&page=${page}`)
        const moviesData = await movies.json()
        const maxpage = (Math.ceil(moviesData.totalResults / 10))
           

        // disables forward button if max page is reached
        if(page==maxpage){ 
            document.getElementById('forw').style.cssText =
                                        `
                                        color: gray;
                                        text-decoration: none;
                                        cursor: default;
                                        pointer-events: none;
                                        `
            //ensures prev button is enabled if max page reached
            document.getElementById('prev').style.cssText =
                                        `
                                        color: rgb(99,98,203);
                                        text-decoration: underline;
                                        cursor: pointer;
                                        pointer-events: all;
                                        `


             
        }
        else{
            document.getElementById('forw').style.cssText =
            `
            color: rgb(99,98,203);
            text-decoration: underline;
            cursor: pointer;
            `

            document.getElementById('prev').style.cssText =
            `
            color: rgb(99,98,203);
            text-decoration: underline;
            cursor: pointer;
            pointer-events: all;
            `
            
        }
            
        movieslist.innerHTML = moviesData.Search.map((movie)=> movieHTML(movie)).join('')
}


async function page__decrease(){
    
    page--
    
    const page__number = document.getElementById('page__number')
    page__number.innerHTML = page

    const searchvalue = document.getElementById('searchBar').value
    const searchyear = document.getElementById('searchBar__year').value
    var searchtype = document.getElementById("filter").value;
        const movies = await fetch(`https://www.omdbapi.com/?apikey=749ea3ae&s=${searchvalue}&y=${searchyear}&type=${searchtype}&page=${page}`)
       
        const moviesData = await movies.json()
     

        if(page==1){ 
            document.getElementById('prev').style.cssText =
                                        `
                                        color: gray;
                                        text-decoration: none;
                                        cursor: default;
                                        pointer-events: none;
                                        `

             
        }
        else{
            document.getElementById('prev').style.cssText =
                                        `
                                        color: rgb(99,98,203);
                                        text-decoration: underline;
                                        cursor: pointer;
                                        pointer-events: all;
                                        `
             document.getElementById('forw').style.cssText =
                                        `
                                        color: rgb(99,98,203);
                                        text-decoration: underline;
                                        cursor: pointer;
                                        ` 
        }
            
        movieslist.innerHTML = moviesData.Search.map((movie)=> movieHTML(movie)).join('')
}



// store IMBD id of the movie that the user clicks on for use in moviedetailed.js
function changeid(id){
    localStorage.setItem("id", id)
    window.location.href = "movie.html"
}

// for use in creating a fade effect whenever certain objects come into view
function isVisible(element){
    let elementBox = element.getBoundingClientRect();
    let distanceFromTop = -200

    if(elementBox.top - window.innerHeight < distanceFromTop){
        return true
    } else {
        return false
    }
}

// creates a fade effect for all sections whenever the section comes into viewheight
function scanDocument(){
    let sectionList = document.querySelectorAll('.hidden')
    sectionList.forEach(function(section){
        if(isVisible(section)){
            section.classList.remove('hidden')
        }  
    })

}
document.addEventListener("scroll", scanDocument)

//dark mode enabller
let contrastToggle = false;
function dark__mode(){
    contrastToggle = !contrastToggle;
  if(contrastToggle){
    document.body.classList += " dark-theme"
  }
  else {
    document.body.classList.remove("dark-theme")
  }
}

//contact card enabller
let isModalOpen = false;
function toggleModal() {
    console.log('lmao')
    if (isModalOpen) {
      isModalOpen = false;
      return document.body.classList.remove("modal--open");
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
  }


// rotates the logo based on position of mouse
document.addEventListener("DOMContentLoaded", function() {
	var pointer = document.getElementById("projector"),
	pointerBox = pointer.getBoundingClientRect(),
	centerPoint = window.getComputedStyle(pointer).transformOrigin,
	centers = centerPoint.split(" ");

	function rotatePointer(e) {
		var pointerEvent = e;
       	if (e.targetTouches && e.targetTouches[0]) {
          		e.preventDefault(); 
          		pointerEvent = e.targetTouches[0];
          		mouseX = pointerEvent.pageX;
          		mouseY = pointerEvent.pageY;
    		} else {
          		mouseX = e.clientX,
          		mouseY = e.clientY;
    		}
 var centerY = pointerBox.top + parseInt(centers[1]) - window.pageYOffset,
 centerX = pointerBox.left + parseInt(centers[0]) - window.pageXOffset,
 radians = Math.atan2(mouseX - centerX, mouseY - centerY),
 degrees = (radians * (180 / Math.PI) * -1) + 100; 
 pointer.style.transform = 'rotate('+degrees+'deg)';
}
window.addEventListener('mousemove', rotatePointer);
window.addEventListener('touchmove', rotatePointer);
window.addEventListener('touchstart', rotatePointer);
})

//email js function
  function contact(event) {
    event.preventDefault();
    const loading = document.querySelector(".modal__overlay--loading");
    const success = document.querySelector(".modal__overlay--success");
    loading.classList += " modal__overlay--visible";
    emailjs
      .sendForm(
        "service_80ih0if",
        "template_d9refyl",
        event.target,
        "user_2jIT9NA6dfZ3X4lKgbInB"
      )
      .then(() => {
        loading.classList.remove("modal__overlay--visible");
        success.classList += " modal__overlay--visible";
      })
      .catch(() => {
        loading.classList.remove("modal__overlay--visible");
        alert(
          "The email service is temporarily unavailable. Please contact me directly on email@email.com"
        );
      });
  }



  function note(){
      alert("Just a little note before you explore, My name is alex and this is a little mock IMDB movie website project of mine built using js API's, please feel free to explore!!")
  }
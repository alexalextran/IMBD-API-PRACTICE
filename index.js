const movieslist = document.querySelector(".movie__list")
const selector = document.querySelector(".page__selector")
let error_notification = false
let render_succsessful = false
var page = 1

const scroll_fading_effect = document.querySelector('.movies__title')
console.log(scroll_fading_effect.getBoundingClientRect())




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
    const maxpage = (Math.ceil(moviesData.totalResults / 10))
    console.log(maxpage)
    page = 1


   
    
   
    var hi = moviesData.Search.map((movie)=> movieHTML(movie)).join('')
        
    
                if(error_notification===true){
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



movieslist.innerHTML = hi

selector.innerHTML = page__selector()
render_succsessful = true

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




            



    console.log(moviesData)
}

                catch(e){

                 error_notification = true
                    
                 

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
    
    <a   id="prev" onclick="page__decrease()"> <i class="fas fa-arrow-left"></i> Previous Page</a> <p  id="page__number">1</p> <a onclick="page__increase(event)" id="forw">Next Page <i class="fas fa-arrow-right"></i></a>

    `
}




async function page__increase(event){
  
    
    page++
    
    const page__number = document.getElementById('page__number')
    page__number.innerHTML = page

    const searchvalue = document.getElementById('searchBar').value
    const searchyear = document.getElementById('searchBar__year').value
    var searchtype = document.getElementById("filter").value;
        const movies = await fetch(`http://www.omdbapi.com/?apikey=749ea3ae&s=${searchvalue}&y=${searchyear}&type=${searchtype}&page=${page}`)
       
        const moviesData = await movies.json()
        const maxpage = (Math.ceil(moviesData.totalResults / 10))
           

       
       

        if(page==maxpage){ 
            document.getElementById('forw').style.cssText =
                                        `
                                        color: gray;
                                        text-decoration: none;
                                        cursor: default;
                                        pointer-events: none;
                                        `

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
            

        var hi = moviesData.Search.map((movie)=> movieHTML(movie)).join('')
        movieslist.innerHTML = hi
}


async function page__decrease(){
    
    page--
    
    const page__number = document.getElementById('page__number')
    page__number.innerHTML = page

    const searchvalue = document.getElementById('searchBar').value
    const searchyear = document.getElementById('searchBar__year').value
    var searchtype = document.getElementById("filter").value;
        const movies = await fetch(`http://www.omdbapi.com/?apikey=749ea3ae&s=${searchvalue}&y=${searchyear}&type=${searchtype}&page=${page}`)
       
        const moviesData = await movies.json()
        const maxpage = (Math.ceil(moviesData.totalResults / 10))
        

       
       

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
            

        var hi = moviesData.Search.map((movie)=> movieHTML(movie)).join('')
        movieslist.innerHTML = hi
}








function changeid(id){
    localStorage.setItem("id", id)
    window.location.href = "movie.html"
}


function isVisible(element){
    let elementBox = element.getBoundingClientRect();
    let distanceFromTop = -200

    if(elementBox.top - window.innerHeight < distanceFromTop){
        return true
    } else {
        return false
    }

   
}


function scanDocument(){
    let sectionList = document.querySelectorAll('.hidden')
    sectionList.forEach(function(section){
        if(isVisible(section)){
            section.classList.remove('hidden')
        }
        
    })


}document.addEventListener("scroll", scanDocument)


let contrastToggle = false;

function dark__mode(){


    contrastToggle = !contrastToggle;

  if(contrastToggle == true){
    document.body.classList += " dark-theme"
  }
  else {
    document.body.classList.remove("dark-theme")
  }
    

}


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
 degrees = (radians * (180 / Math.PI) * -1) + 90; 
 pointer.style.transform = 'rotate('+degrees+'deg)';
}

window.addEventListener('mousemove', rotatePointer);
window.addEventListener('touchmove', rotatePointer);
window.addEventListener('touchstart', rotatePointer);
})
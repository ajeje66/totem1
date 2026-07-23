//==============================
// CONFIGURAZIONE
//==============================

const DATA_FILE = "data/gallery.json";

const HOME_PAGE = "index.html";

// tempo di inattività (60 secondi)
const INACTIVITY_TIME = 10000;

let slides = [];
let currentSlide = 0;

let inactivityTimer = null;



const container = document.getElementById("slideContainer");
const progress = document.getElementById("progress");


//==============================
// OROLOGIO
//==============================

function updateClock(){

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString("it-IT");

    document.getElementById("date").innerHTML =
        now.toLocaleDateString("it-IT",{
            weekday:"long",
            day:"2-digit",
            month:"long",
            year:"numeric"
        });

}

updateClock();

setInterval(updateClock,1000);


//==============================
// CARICA JSON
//==============================

fetch(DATA_FILE)

.then(response=>response.json())

.then(data=>{


    data.forEach(item=>{


        let slide=document.createElement("div");

        slide.className="swiper-slide";


        if(item.type==="image"){

            slide.innerHTML=
            `
            <img src="${item.src}">
            `;

        }


        if(item.type==="video"){

            slide.innerHTML=
            `
            <video 
            src="${item.src}"
            muted
            playsinline>
            </video>
            `;

        }


        document
        .getElementById("slideContainer")
        .appendChild(slide);


    });



    new Swiper(".swiper",{

        loop:true,

        effect:"slide",

        speed:600,


        navigation:{

            nextEl:".swiper-button-next",

            prevEl:".swiper-button-prev"

        },


        pagination:{

            el:".swiper-pagination",

            clickable:true

        },


        // niente autoplay
        autoplay:false


    });


});


//==============================
// CREA LE SLIDE
//==============================

function createSlides(){

    container.innerHTML="";

    slides.forEach(item=>{

        const slide=document.createElement("div");

        slide.className="slide";

        if(item.type==="image"){

            const img=document.createElement("img");

            img.src=item.src;

            slide.appendChild(img);

        }

        if(item.type==="video"){

            const video=document.createElement("video");

            video.src=item.src;

            video.loop=true;
            video.muted=true;
            video.playsInline=true;

            slide.appendChild(video);

        }

        container.appendChild(slide);

    });

}


//==============================
// MOSTRA SLIDE
//==============================

function showSlide(index){

    clearTimeout(slideTimer);

    const allSlides=document.querySelectorAll(".slide");

    allSlides.forEach(slide=>{

        slide.classList.remove("active");

        const video=slide.querySelector("video");

        if(video){

            video.pause();
            video.currentTime=0;

        }

    });

    currentSlide=index;

    const slide=allSlides[index];

    slide.classList.add("active");

    slideDuration=(slides[index].duration || 8)*1000;

    const video=slide.querySelector("video");

    if(video){

        video.play();

    }

    animateProgress();

}

//==============================
// PROGRESS BAR
//==============================

function animateProgress(){

    progress.style.transition="none";

    progress.style.width="0%";

    requestAnimationFrame(()=>{

        progress.style.transition=
            `width ${slideDuration}ms linear`;

        progress.style.width="100%";

    });

}


//==============================
// TIMER INATTIVITA'
//==============================
let countdownTimer = null;
let remainingSeconds = INACTIVITY_TIME / 1000;


function resetInactivity(){

    clearTimeout(inactivityTimer);
    clearInterval(countdownTimer);


    remainingSeconds = INACTIVITY_TIME / 1000;


    console.clear();
    console.log(
        "Ritorno alla home tra:",
        remainingSeconds,
        "secondi"
    );


    // conto alla rovescia in console

    countdownTimer = setInterval(()=>{

        remainingSeconds--;

        console.log(
            "Ritorno alla home tra:",
            remainingSeconds,
            "secondi"
        );


        if(remainingSeconds <= 0){

            clearInterval(countdownTimer);

        }


    },1000);



    inactivityTimer=setTimeout(()=>{

        console.log("Ritorno alla pagina iniziale");

        window.location.href=HOME_PAGE;


    },INACTIVITY_TIME);

}


//==============================
// EVENTI
//==============================

document.addEventListener("click",resetInactivity);

document.addEventListener("touchstart",resetInactivity);

document.addEventListener("mousemove",resetInactivity);

document.addEventListener("keydown",resetInactivity);


// avvia timer

resetInactivity();

/*document.getElementById("nextBtn").onclick = () => {

    currentSlide++;

    if(currentSlide >= slides.length)
        currentSlide = 0;

    showSlide(currentSlide);

    resetInactivity();

*/
/*
document.getElementById("prevBtn").onclick = () => {

    currentSlide--;

    if(currentSlide < 0)
        currentSlide = slides.length - 1;

    showSlide(currentSlide);

    resetInactivity();

};*/
document
.getElementById("backButton")
.addEventListener("click",()=>{

    window.location.href="index.html";

});
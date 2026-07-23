// =========================
// CONFIGURAZIONE
// =========================

const DATA_FILE = "data/intro.json";

let slides = [];
let currentIndex = 0;

let slideDuration = 8000; // valore predefinito

const slideContainer = document.getElementById("slideContainer");
const progress = document.getElementById("progress");

// =========================
// DATA E OROLOGIO
// =========================

function updateClock(){

    const now = new Date();

    const giorni = [
        "Domenica",
        "Lunedì",
        "Martedì",
        "Mercoledì",
        "Giovedì",
        "Venerdì",
        "Sabato"
    ];

    const mesi = [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre"
    ];

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString("it-IT");

    document.getElementById("date").innerHTML =
        giorni[now.getDay()] + " " +
        now.getDate() + " " +
        mesi[now.getMonth()] + " " +
        now.getFullYear();

}

setInterval(updateClock,1000);

updateClock();

// =========================
// CARICAMENTO JSON
// =========================

fetch(DATA_FILE)

.then(response => response.json())

.then(data=>{

    slides = data;

    createSlides();

    showSlide(0);

});

// =========================
// CREA SLIDE
// =========================

function createSlides(){

    slideContainer.innerHTML="";

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

            video.autoplay=false;

            video.loop=true;

            video.muted=true;

            video.playsInline=true;

            slide.appendChild(video);

        }

        slideContainer.appendChild(slide);

    });

}

// =========================
// MOSTRA SLIDE
// =========================

function showSlide(index){

    const allSlides=document.querySelectorAll(".slide");

    allSlides.forEach(slide=>{

        slide.classList.remove("active");

        const video=slide.querySelector("video");

        if(video){

            video.pause();

            video.currentTime=0;

        }

    });

    const slide=allSlides[index];

    slide.classList.add("active");

    slideDuration=(slides[index].duration || 8)*1000;

    const video=slide.querySelector("video");

    if(video){

        video.play();

    }

    animateProgress();

    setTimeout(nextSlide,slideDuration);

}

// =========================
// SLIDE SUCCESSIVA
// =========================

function nextSlide(){

    currentIndex++;

    if(currentIndex>=slides.length){

        currentIndex=0;

    }

    showSlide(currentIndex);

}

// =========================
// PROGRESS BAR
// =========================

function animateProgress(){

    progress.style.transition="none";

    progress.style.width="0%";

    setTimeout(()=>{

        progress.style.transition=`width ${slideDuration}ms linear`;

        progress.style.width="100%";

    },50);

}

// =========================
// AREA TOUCH
// =========================

document
.getElementById("touchArea")
.addEventListener("click",()=>{

    window.location.href="gallery.html";

});
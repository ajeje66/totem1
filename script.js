// ===============================
// CONFIGURAZIONE
// ===============================

const carousel = document.getElementById("carousel");
const intro = document.getElementById("intro");
const contenuto = document.getElementById("contenuto");
const progress = document.getElementById("progress");

let slides = [];
let dati = [];

let indice = 0;

const durataDefault = 5000;



// ===============================
// CARICAMENTO JSON
// ===============================

fetch("foto.json")

.then(response => response.json())

.then(json => {

    dati = json;

    creaCarosello();

})

.catch(error => {

    console.error(
        "Errore caricamento foto.json:",
        error
    );

});




// ===============================
// CREAZIONE SLIDE
// ===============================

function creaCarosello(){


    dati.forEach((elemento, index)=>{


        let slide;



        // VIDEO

        if(elemento.tipo === "video"){


            slide = document.createElement("video");


            slide.src = elemento.src;


            slide.autoplay = false;

            slide.muted = true;

            slide.playsInline = true;


            slide.addEventListener(
                "ended",
                cambiaSlide
            );



        }



        // IMMAGINE

        else {


            slide = document.createElement("img");


            slide.src = elemento.src;


        }



        slide.classList.add("slide");



        if(index === 0){

            slide.classList.add("active");

        }



        carousel.appendChild(slide);



    });



    slides =
        document.querySelectorAll(".slide");



    avviaSlide();

}




// ===============================
// AVVIO SLIDE CORRENTE
// ===============================

function avviaSlide(){


    let elemento =
        slides[indice];



    resetProgress();



    // VIDEO

    if(elemento.tagName === "VIDEO"){


        elemento.currentTime = 0;


        elemento.play();



    }


    // FOTO

    else {


        let tempo =
            dati[indice].durata ||
            durataDefault;



        avviaProgress(tempo);



        setTimeout(()=>{


            cambiaSlide();


        },tempo);


    }

}




// ===============================
// CAMBIO SLIDE
// ===============================

function cambiaSlide(){


    slides[indice]
    .classList.remove("active");



    // stop video precedente

    if(slides[indice].tagName === "VIDEO"){

        slides[indice].pause();

        slides[indice].currentTime=0;

    }



    indice++;



    if(indice >= slides.length){

        indice=0;

    }



    slides[indice]
    .classList.add("active");



    avviaSlide();


}




// ===============================
// PROGRESS BAR FLUIDA
// ===============================

function resetProgress(){


    progress.style.transition="none";

    progress.style.width="0%";


    // forza refresh browser

    progress.offsetWidth;


}




function avviaProgress(tempo){


    progress.style.transition =
        `width ${tempo}ms linear`;



    progress.style.width="100%";


}




// ===============================
// OROLOGIO
// ===============================

function aggiornaOra(){


    let ora =
        new Date();



    document.getElementById("clock")
    .innerHTML =
    ora.toLocaleTimeString(
        "it-IT"
    );



    document.getElementById("date")
    .innerHTML =
    ora.toLocaleDateString(
        "it-IT",
        {
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );


}



setInterval(
    aggiornaOra,
    1000
);


aggiornaOra();





// ===============================
// APERTURA IFRAME
// ===============================

intro.addEventListener(
"click",
()=>{


    intro.style.opacity="0";



    setTimeout(()=>{


        intro.style.display="none";


        contenuto.style.display="block";


    },800);



});
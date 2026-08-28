const openButton =
    document.getElementById("openButton");

const envelopeWrapper =
    document.getElementById("envelopeWrapper");

const invitationStage =
    document.getElementById("invitationStage");

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");


let opened = false;
let musicPlaying = false;


/* ==========================
   INICIAR MÚSICA
========================== */

async function startMusic() {

    try {

        music.volume = 0.8;

        await music.play();

        musicPlaying = true;

        musicButton.style.display = "flex";

        musicButton.classList.add("active");

        musicButton.textContent = "♫";

    } catch (error) {

        console.log(
            "El navegador bloqueó el audio:",
            error
        );

        /*
            Si el celular bloquea
            la reproducción, mostramos
            el botón para que el usuario
            pueda iniciarla manualmente.
        */

        musicPlaying = false;

        musicButton.style.display = "flex";

        musicButton.classList.remove("active");

        musicButton.textContent = "▶";

    }

}


/* ==========================
   ABRIR INVITACIÓN
========================== */

function openInvitation() {

    if (opened) {
        return;
    }


    opened = true;


    /*
        IMPORTANTE:
        Intentamos reproducir la música
        inmediatamente dentro del clic.

        Esto mejora la compatibilidad
        con Safari/iPhone y Android.
    */

    startMusic();


    /*
        Oculta el texto inicial.
    */

    document.body.classList.add(
        "invitation-opened"
    );


    /*
        Da espacio para mostrar
        toda la carta.
    */

    invitationStage.classList.add(
        "opened"
    );


    /*
        Abre el sobre en 3D.
    */

    envelopeWrapper.classList.add(
        "opening"
    );


    /*
        Flores + luciérnagas.
    */

    setTimeout(() => {

        envelopeWrapper.classList.add(
            "bloom"
        );

    }, 500);


    /*
        La carta sale del sobre.
    */

    setTimeout(() => {

        envelopeWrapper.classList.add(
            "show-letter"
        );

    }, 850);

}


/* ==========================
   BOTÓN ABRIR
========================== */

openButton.addEventListener(
    "click",
    openInvitation
);


/* ==========================
   BOTÓN DE MÚSICA
========================== */

musicButton.addEventListener(
    "click",
    async () => {

        /*
            Si está sonando,
            la pausamos.
        */

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            musicButton.classList.remove(
                "active"
            );

            musicButton.textContent = "▶";

            return;
        }


        /*
            Si está pausada,
            intentamos reproducirla.
        */

        try {

            await music.play();

            musicPlaying = true;

            musicButton.classList.add(
                "active"
            );

            musicButton.textContent = "♫";

        } catch (error) {

            console.log(
                "No se pudo reproducir la música:",
                error
            );

            musicPlaying = false;

            musicButton.textContent = "▶";

        }

    }
);


/* ==========================
   ESTADO DEL AUDIO
========================== */

/*
    Si la música termina o se pausa
    por alguna razón, actualizamos
    el botón.
*/

music.addEventListener(
    "pause",
    () => {

        musicPlaying = false;

        musicButton.classList.remove(
            "active"
        );

        musicButton.textContent = "▶";

    }
);


music.addEventListener(
    "play",
    () => {

        musicPlaying = true;

        musicButton.classList.add(
            "active"
        );

        musicButton.textContent = "♫";

    }
);


/* ==========================
   MANEJO DE ERRORES
========================== */

music.addEventListener(
    "error",
    () => {

        console.log(
            "Hubo un problema cargando el archivo de música."
        );

        musicPlaying = false;

        musicButton.style.display = "flex";

        musicButton.classList.remove(
            "active"
        );

        musicButton.textContent = "▶";

    }
);
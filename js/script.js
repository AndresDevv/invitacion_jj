const openButton =
    document.getElementById(
        "openButton"
    );


const envelopeWrapper =
    document.getElementById(
        "envelopeWrapper"
    );


const invitationStage =
    document.getElementById(
        "invitationStage"
    );


const music =
    document.getElementById(
        "backgroundMusic"
    );


const musicButton =
    document.getElementById(
        "musicButton"
    );


let opened = false;

let musicPlaying = false;



function openInvitation() {

    if (opened) {
        return;
    }


    opened = true;


    /*
        Ocultar texto superior
    */

    document.body.classList.add(
        "invitation-opened"
    );


    /*
        Dar espacio a la carta
    */

    invitationStage.classList.add(
        "opened"
    );


    /*
        Abrir sobre
    */

    envelopeWrapper.classList.add(
        "opening"
    );


    /*
        Iniciar música
    */

    music.play()
        .then(() => {

            musicPlaying = true;

            musicButton.style.display =
                "flex";

            musicButton.classList.add(
                "active"
            );

            musicButton.textContent =
                "♫";

        })
        .catch(() => {

            /*
                Si algún navegador bloquea
                el audio, mostramos igual
                el botón para activarlo.
            */

            musicPlaying = false;

            musicButton.style.display =
                "flex";

            musicButton.textContent =
                "♪";

        });


    /*
        Flores y luciérnagas
    */

    setTimeout(() => {

        envelopeWrapper.classList.add(
            "bloom"
        );

    }, 500);


    /*
        Carta
    */

    setTimeout(() => {

        envelopeWrapper.classList.add(
            "show-letter"
        );

    }, 850);

}



openButton.addEventListener(
    "click",
    openInvitation
);



/*
    PAUSAR / REPRODUCIR
*/

musicButton.addEventListener(
    "click",
    () => {

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            musicButton.textContent =
                "♪";

            musicButton.classList.remove(
                "active"
            );

        } else {

            music.play();

            musicPlaying = true;

            musicButton.textContent =
                "♫";

            musicButton.classList.add(
                "active"
            );

        }

    }
);
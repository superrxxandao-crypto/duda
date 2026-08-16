const botao = document.getElementById("botaoFujao");

let velocidade = 0.8;
let cliques = 0;
let fugindo = false;

const frases = [
    "QUASE, VIDA ❤️",
    "KKKKK VEM, AMOR ❤️",
    "TENTA DE NOVO, BABY 😘",
    "NÃO VAI CONSEGUIR, MEU AMOR ❤️",
    "QUASE PEGOU 😂❤️",
    "VEM CÁ, AMORZINHO 🥰",
    "AINDA NÃO, BABY ❤️",
    "KKKKK TE AMO 😂❤️",
    "TENTA DE NOVO, MEU BEM 💕",
    "VEM ME PEGAR, VIDA 😘",
    "EU TE AMO ❤️",
    "QUASE, MEU AMOR 🥹❤️",
    "CORRE ATRÁS DE MIM 😂💕",
    "VOCÊ É FOFA DEMAIS ❤️",
    "NÃO DESISTE, VIDA 🥰"
];


// ========================================
// VERIFICA SE É CELULAR / TABLET
// ========================================

function ehTouch() {
    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
    );
}


// ========================================
// ESCOLHE UMA NOVA POSIÇÃO
// ========================================

function novaPosicaoTouch(x, y) {

    const rect =
        botao.getBoundingClientRect();

    let novaX;
    let novaY;

    let tentativas = 0;

    do {

        novaX =
            Math.random() *
            (
                window.innerWidth -
                rect.width -
                20
            ) + 10;

        novaY =
            Math.random() *
            (
                window.innerHeight -
                rect.height -
                20
            ) + 10;

        const centroX =
            novaX + rect.width / 2;

        const centroY =
            novaY + rect.height / 2;

        const distancia =
            Math.sqrt(
                Math.pow(x - centroX, 2) +
                Math.pow(y - centroY, 2)
            );

        tentativas++;

        if (distancia > 280) {
            break;
        }

    } while (tentativas < 50);


    novaX = Math.max(
        10,
        Math.min(
            novaX,
            window.innerWidth -
            rect.width -
            10
        )
    );

    novaY = Math.max(
        10,
        Math.min(
            novaY,
            window.innerHeight -
            rect.height -
            10
        )
    );


    botao.style.transition =
        `left ${0.18 / velocidade}s ease,
         top ${0.18 / velocidade}s ease`;

    botao.style.left =
        novaX + "px";

    botao.style.top =
        novaY + "px";


    botao.textContent =
        frases[
            Math.floor(
                Math.random() *
                frases.length
            )
        ];


    velocidade += 0.12;
}


// ========================================
// TOUCH — FUGA IMEDIATA
// ========================================

document.addEventListener(
    "touchstart",
    (event) => {

        if (!ehTouch()) return;

        const toque =
            event.touches[0];

        if (!toque) return;


        const rect =
            botao.getBoundingClientRect();


        const margem = 180;


        const dentroDaArea =
            toque.clientX >
                rect.left - margem &&

            toque.clientX <
                rect.right + margem &&

            toque.clientY >
                rect.top - margem &&

            toque.clientY <
                rect.bottom + margem;


        if (dentroDaArea) {

            novaPosicaoTouch(
                toque.clientX,
                toque.clientY
            );

        }

    },
    {
        passive: true
    }
);


// ========================================
// TOUCHMOVE
// ========================================

document.addEventListener(
    "touchmove",
    (event) => {

        if (!ehTouch()) return;

        const toque =
            event.touches[0];

        if (!toque) return;


        const rect =
            botao.getBoundingClientRect();


        const centroX =
            rect.left +
            rect.width / 2;

        const centroY =
            rect.top +
            rect.height / 2;


        const distancia =
            Math.sqrt(
                Math.pow(
                    toque.clientX -
                    centroX,
                    2
                ) +
                Math.pow(
                    toque.clientY -
                    centroY,
                    2
                )
            );


        // ÁREA GRANDE DE FUGA

        if (distancia < 220) {

            novaPosicaoTouch(
                toque.clientX,
                toque.clientY
            );

        }

    },
    {
        passive: true
    }
);


// ========================================
// PC — MOUSE
// ========================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (ehTouch()) return;

        const rect =
            botao.getBoundingClientRect();


        const centroX =
            rect.left +
            rect.width / 2;

        const centroY =
            rect.top +
            rect.height / 2;


        const distancia =
            Math.sqrt(
                Math.pow(
                    event.clientX -
                    centroX,
                    2
                ) +
                Math.pow(
                    event.clientY -
                    centroY,
                    2
                )
            );


        if (distancia < 120) {

            novaPosicaoTouch(
                event.clientX,
                event.clientY
            );

        }

    }
);


// ========================================
// CLIQUE
// ========================================

botao.addEventListener(
    "click",
    () => {

        cliques++;


        if (cliques < 4) {

            botao.textContent =
                `${cliques}/4 ❤️`;

            return;
        }


        const surpresa =
            document.getElementById(
                "surpresa"
            );

        const musica =
            document.getElementById(
                "musica"
            );


        surpresa.style.display =
            "flex";

        botao.style.display =
            "none";


        musica.play().catch(() => {

            console.log(
                "O navegador bloqueou a música."
            );

        });


        for (
            let i = 0;
            i < 20;
            i++
        ) {

            setTimeout(
                criarCoracao,
                i * 150
            );

        }

    }
);


// ========================================
// CORAÇÕES
// ========================================

function criarCoracao() {

    const coracao =
        document.createElement("div");

    coracao.innerHTML =
        "❤️";

    coracao.style.position =
        "fixed";

    coracao.style.left =
        Math.random() * 100 + "vw";

    coracao.style.bottom =
        "-30px";

    coracao.style.fontSize =
        (
            15 +
            Math.random() * 25
        ) + "px";

    coracao.style.zIndex =
        "9999";

    coracao.style.pointerEvents =
        "none";


    document.body.appendChild(
        coracao
    );


    const duracao =
        3000 +
        Math.random() * 3000;


    coracao.animate(

        [
            {
                transform:
                    "translateY(0) rotate(0deg)",

                opacity: 1
            },

            {
                transform:
                    "translateY(-110vh) rotate(360deg)",

                opacity: 0
            }
        ],

        {
            duration:
                duracao,

            easing:
                "linear"
        }
    );


    setTimeout(
        () => coracao.remove(),
        duracao
    );
}

        coracao.remove();

    }, duracao);
}

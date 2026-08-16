const botao = document.getElementById("botaoFujao");

let velocidade = 0.7;
let cliques = 0;

const frases = [
    "QUASE, VIDA ❤️",
    "KKKKK VEM, AMOR ❤️",
    "TENTA DE NOVO, BABY 😘",
    "NÃO VAI CONSEGUIR, MEU AMOR ❤️",
    "QUASE PEGOU, VIDA 😂❤️",
    "VEM CÁ, AMORZINHO 🥰",
    "AINDA NÃO, BABY ❤️",
    "KKKKK TE AMO, MAS NÃO VOU DEIXAR 😂❤️",
    "TENTA DE NOVO, MEU BEM 💕",
    "VEM ME PEGAR, VIDA 😘",
    "EU TE AMO ❤️",
    "QUASE, MEU AMOR 🥹❤️",
    "CORRE ATRÁS DE MIM, BABY 😂💕",
    "VOCÊ É FOFA DEMAIS ❤️",
    "NÃO DESISTE, VIDA 🥰",
    "AINDA FALTA 😈❤️",
    "4 CLIQUES, AMOR ❤️",
    "VOCÊ CONSEGUE, BABY 😘"
];


// Detecta se é celular ou tablet
function ehTouch() {
    return window.matchMedia("(pointer: coarse)").matches;
}


// Faz o botão fugir
function fugir(x, y) {

    const rect = botao.getBoundingClientRect();

    const centroX =
        rect.left + rect.width / 2;

    const centroY =
        rect.top + rect.height / 2;

    const distanciaX =
        x - centroX;

    const distanciaY =
        y - centroY;

    const distancia =
        Math.sqrt(
            distanciaX * distanciaX +
            distanciaY * distanciaY
        );


    // DISTÂNCIA DE DETECÇÃO
    const distanciaFuga =
        ehTouch() ? 150 : 100;


    if (distancia < distanciaFuga) {

        let novaX;
        let novaY;


        // =================================
        // CELULAR / TABLET
        // =================================

        if (ehTouch()) {

            // Cria uma posição aleatória
            // bem longe do dedo

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

                const novaCentroX =
                    novaX +
                    rect.width / 2;

                const novaCentroY =
                    novaY +
                    rect.height / 2;

                const distanciaNova =
                    Math.sqrt(
                        Math.pow(
                            x - novaCentroX,
                            2
                        ) +
                        Math.pow(
                            y - novaCentroY,
                            2
                        )
                    );

                // Continua sorteando enquanto
                // estiver perto demais do dedo

                if (distanciaNova > 250) {
                    break;
                }

            } while (true);


            // Movimento mais rápido no touch

            botao.style.transition =
                `all ${0.18 / velocidade}s ease`;
        }


        // =================================
        // PC
        // =================================

        else {

            const margem = 60;


            if (centroX < margem) {

                novaX =
                    window.innerWidth -
                    rect.width -
                    margem;

                novaY =
                    Math.random() *
                    (
                        window.innerHeight -
                        rect.height
                    );
            }


            else if (
                centroX >
                window.innerWidth - margem
            ) {

                novaX = margem;

                novaY =
                    Math.random() *
                    (
                        window.innerHeight -
                        rect.height
                    );
            }


            else if (centroY < margem) {

                novaX =
                    Math.random() *
                    (
                        window.innerWidth -
                        rect.width
                    );

                novaY =
                    window.innerHeight -
                    rect.height -
                    margem;
            }


            else if (
                centroY >
                window.innerHeight - margem
            ) {

                novaX =
                    Math.random() *
                    (
                        window.innerWidth -
                        rect.width
                    );

                novaY = margem;
            }


            else {

                novaX =
                    centroX -
                    distanciaX * 2;

                novaY =
                    centroY -
                    distanciaY * 2;
            }


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
                `all ${0.4 / velocidade}s ease`;
        }


        // Aplica a nova posição

        botao.style.left =
            novaX + "px";

        botao.style.top =
            novaY + "px";


        // Nova frase

        const fraseAleatoria =
            frases[
                Math.floor(
                    Math.random() *
                    frases.length
                )
            ];

        botao.textContent =
            fraseAleatoria;


        // Aumenta a dificuldade

        if (ehTouch()) {

            velocidade += 0.12;

        } else {

            velocidade += 0.05;
        }
    }
}


// =================================
// PC
// =================================

document.addEventListener(
    "mousemove",
    (event) => {

        fugir(
            event.clientX,
            event.clientY
        );

    }
);


// =================================
// CELULAR / TABLET
// =================================

document.addEventListener(
    "touchmove",
    (event) => {

        const toque =
            event.touches[0];

        if (!toque) return;

        fugir(
            toque.clientX,
            toque.clientY
        );

    },
    {
        passive: true
    }
);


// =================================
// CLIQUE
// =================================

botao.addEventListener(
    "click",
    () => {

        cliques++;


        // Ainda não chegou aos 4

        if (cliques < 4) {

            botao.textContent =
                `${cliques}/4 ❤️`;

            return;
        }


        // =================================
        // 4 CLIQUES
        // =================================

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


        // Música

        musica.play().catch(() => {

            console.log(
                "O navegador bloqueou a música."
            );

        });


        // =================================
        // CORAÇÕES
        // =================================

        for (
            let i = 0;
            i < 20;
            i++
        ) {

            setTimeout(
                () => {

                    criarCoracao();

                },
                i * 150
            );
        }

    }
);


// =================================
// CORAÇÕES
// =================================

function criarCoracao() {

    const coracao =
        document.createElement(
            "div"
        );


    coracao.innerHTML =
        "❤️";


    coracao.style.position =
        "fixed";


    coracao.style.left =
        Math.random() * 100 +
        "vw";


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
        () => {

            coracao.remove();

        },
        duracao
    );
}

        coracao.remove();

    }, duracao);
}

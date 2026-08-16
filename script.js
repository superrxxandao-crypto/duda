const botao = document.getElementById("botaoFujao");

let cliques = 0;
let velocidade = 0.8;

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
// FAZER O BOTÃO FUGIR
// ========================================

function fugir() {

    const rect =
        botao.getBoundingClientRect();

    let novaX;
    let novaY;

    const margem = 15;

    // Escolhe uma posição completamente aleatória

    novaX =
        Math.random() *
        (
            window.innerWidth -
            rect.width -
            margem * 2
        ) + margem;

    novaY =
        Math.random() *
        (
            window.innerHeight -
            rect.height -
            margem * 2
        ) + margem;


    // Garante que não saia da tela

    novaX = Math.max(
        margem,
        Math.min(
            novaX,
            window.innerWidth -
            rect.width -
            margem
        )
    );

    novaY = Math.max(
        margem,
        Math.min(
            novaY,
            window.innerHeight -
            rect.height -
            margem
        )
    );


    // Quanto mais cliques,
    // mais rápido ele foge

    botao.style.transition =
        `left ${0.25 / velocidade}s ease,
         top ${0.25 / velocidade}s ease`;


    botao.style.left =
        novaX + "px";

    botao.style.top =
        novaY + "px";


    // Frase aleatória

    botao.textContent =
        frases[
            Math.floor(
                Math.random() *
                frases.length
            )
        ];


    // Aumenta a velocidade

    velocidade += 0.15;
}


// ========================================
// CLIQUE / TOQUE
// ========================================

botao.addEventListener(
    "click",
    () => {

        cliques++;


        // =================================
        // PRIMEIRO, SEGUNDO E TERCEIRO
        // =================================

        if (cliques < 4) {

            botao.textContent =
                `${cliques}/4 ❤️`;


            // Espera um pouquinho para
            // mostrar o contador e foge

            setTimeout(
                () => {

                    fugir();

                },
                100
            );


            return;
        }


        // =================================
        // QUARTO CLIQUE
        // =================================

        const surpresa =
            document.getElementById(
                "surpresa"
            );

        const musica =
            document.getElementById(
                "musica"
            );


        // Esconde o botão

        botao.style.display =
            "none";


        // Mostra surpresa

        surpresa.style.display =
            "flex";


        // Toca música

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
            i < 25;
            i++
        ) {

            setTimeout(
                () => {

                    criarCoracao();

                },
                i * 120
            );

        }

    }
);


// ========================================
// CORAÇÕES
// ========================================

function criarCoracao() {

    const coracao =
        document.createElement(
            "div"
        );


    coracao.innerHTML =
        "❤️";


    coracao.className =
        "coracao";


    coracao.style.left =
        Math.random() * 100 +
        "vw";


    coracao.style.fontSize =
        (
            15 +
            Math.random() * 25
        ) + "px";


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

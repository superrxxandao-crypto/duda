const botao = document.getElementById("botaoFujao");

let cliques = 0;
let velocidade = 0.8;

const frases = [
    "QUASE, VIDA ❤️",
    "VEM CÁ, AMOR 😘",
    "TENTA DE NOVO, BABY ❤️",
    "PEGA EU 😂❤️",
    "QUASE PEGOU 😈❤️",
    "VEM, VIDA 🥰",
    "AINDA NÃO, AMOR ❤️",
    "TE AMO, MAS VOU FUGIR 😂",
    "TENTA DE NOVO 💕",
    "VEM ME PEGAR 😘",
    "EU TE AMO ❤️",
    "QUASE, MEU AMOR 🥹",
    "CORRE ATRÁS DE MIM 😂💕",
    "VOCÊ CONSEGUE ❤️",
    "NÃO DESISTE, VIDA 🥰"
];


// ========================================
// PEGAR POSIÇÃO ALEATÓRIA
// ========================================

function moverAutomaticamente() {

    if (botao.style.display === "none") {
        return;
    }

    const rect =
        botao.getBoundingClientRect();

    const margem = 20;

    const novaX =
        Math.random() *
        (
            window.innerWidth -
            rect.width -
            margem * 2
        ) + margem;

    const novaY =
        Math.random() *
        (
            window.innerHeight -
            rect.height -
            margem * 2
        ) + margem;


    botao.style.transition =
        `left ${1.2 / velocidade}s ease,
         top ${1.2 / velocidade}s ease`;

    botao.style.left =
        novaX + "px";

    botao.style.top =
        novaY + "px";
}


// ========================================
// MOVIMENTO AUTOMÁTICO
// ========================================

function iniciarMovimento() {

    setInterval(() => {

        moverAutomaticamente();

    }, 1200);

}


// ========================================
// TOQUE / CLIQUE
// ========================================

botao.addEventListener(
    "pointerup",
    (event) => {

        event.preventDefault();

        cliques++;


        // =================================
        // 1º, 2º E 3º
        // =================================

        if (cliques < 4) {

            botao.textContent =
                `${cliques}/4 ❤️`;

            velocidade += 0.15;

            moverAutomaticamente();

            return;
        }


        // =================================
        // 4º CLIQUE
        // =================================

        const surpresa =
            document.getElementById(
                "surpresa"
            );

        const musica =
            document.getElementById(
                "musica"
            );


        botao.style.display =
            "none";

        surpresa.style.display =
            "flex";


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
                criarCoracao,
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
        document.createElement("div");

    coracao.innerHTML =
        "❤️";

    coracao.className =
        "coracao";

    coracao.style.left =
        Math.random() * 100 + "vw";

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


// ========================================
// COMEÇA A ANDAR
// ========================================

iniciarMovimento();
        coracao.remove();

    }, duracao);
}

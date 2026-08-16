const botao = document.getElementById("botaoFujao");

const surpresa = document.getElementById("surpresa");

const musica = document.getElementById("musica");

let cliques = 0;

let tempo = 1200;


const frases = [
    "QUASE, VIDA ❤️",
    "VEM CÁ, AMOR 😘",
    "TENTA DE NOVO, BABY ❤️",
    "PEGA EU 😂❤️",
    "QUASE PEGOU 😈❤️",
    "VEM, VIDA 🥰",
    "AINDA NÃO, AMOR ❤️",
    "TE AMO ❤️",
    "TENTA DE NOVO 💕",
    "VEM ME PEGAR 😘",
    "QUASE, MEU AMOR 🥹",
    "CORRE ATRÁS DE MIM 😂💕"
];


/* =========================
   MOVER BOTÃO
========================= */

function moverBotao() {

    if (botao.style.display === "none") {
        return;
    }

    const largura = botao.offsetWidth;

    const altura = botao.offsetHeight;

    const margem = 20;


    const maxX =
        window.innerWidth -
        largura -
        margem;


    const maxY =
        window.innerHeight -
        altura -
        margem;


    const x =
        Math.random() *
        (maxX - margem) +
        margem;


    const y =
        Math.random() *
        (maxY - margem) +
        margem;


    botao.style.transform = "none";

    botao.style.left = x + "px";

    botao.style.top = y + "px";


    botao.textContent =
        frases[
            Math.floor(
                Math.random() *
                frases.length
            )
        ];
}


/* =========================
   BOTÃO ANDANDO SOZINHO
========================= */

let intervalo =
    setInterval(
        moverBotao,
        tempo
    );


/* =========================
   TOQUE / CLIQUE
========================= */

botao.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        cliques++;


        if (cliques < 4) {

            botao.textContent =
                `${cliques}/4 ❤️`;


            moverBotao();


            tempo =
                Math.max(
                    350,
                    tempo - 200
                );


            clearInterval(
                intervalo
            );


            intervalo =
                setInterval(
                    moverBotao,
                    tempo
                );


            return;
        }


        /* =====================
           4º CLIQUE
        ===================== */

        clearInterval(
            intervalo
        );


        botao.style.display =
            "none";


        surpresa.style.display =
            "flex";


        musica.play().catch(
            function() {
                console.log(
                    "Clique novamente para tocar a música."
                );
            }
        );


        /* CORAÇÕES */

        for (
            let i = 0;
            i < 30;
            i++
        ) {

            setTimeout(
                criarCoracao,
                i * 120
            );

        }

    }
);


/* =========================
   CORAÇÕES
========================= */

function criarCoracao() {

    const coracao =
        document.createElement(
            "div"
        );


    coracao.className =
        "coracao";


    coracao.textContent =
        "❤️";


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
            duration: duracao,

            easing: "linear"
        }
    );


    setTimeout(
        function() {

            coracao.remove();

        },
        duracao
    );
}

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
    "NÃO DESISTE, VIDA 🥰"
];

function fugir(x, y) {

    const rect = botao.getBoundingClientRect();

    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    const distanciaX = x - centroX;
    const distanciaY = y - centroY;

    const distancia = Math.sqrt(
        distanciaX * distanciaX +
        distanciaY * distanciaY
    );

    if (distancia < 100) {

        const margem = 60;

        let novaX;
        let novaY;

        if (centroX < margem) {

            novaX =
                window.innerWidth -
                rect.width -
                margem;

            novaY =
                Math.random() *
                (window.innerHeight - rect.height);

        }

        else if (centroX > window.innerWidth - margem) {

            novaX = margem;

            novaY =
                Math.random() *
                (window.innerHeight - rect.height);

        }

        else if (centroY < margem) {

            novaX =
                Math.random() *
                (window.innerWidth - rect.width);

            novaY =
                window.innerHeight -
                rect.height -
                margem;

        }

        else if (centroY > window.innerHeight - margem) {

            novaX =
                Math.random() *
                (window.innerWidth - rect.width);

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

        botao.style.left =
            novaX + "px";

        botao.style.top =
            novaY + "px";

        const fraseAleatoria =
            frases[
                Math.floor(
                    Math.random() * frases.length
                )
            ];

        botao.textContent =
            fraseAleatoria;

        velocidade += 0.05;
    }
}


// PC
document.addEventListener("mousemove", (event) => {

    fugir(
        event.clientX,
        event.clientY
    );

});


// CELULAR E TABLET
document.addEventListener(
    "touchmove",
    (event) => {

        const toque = event.touches[0];

        if (!toque) return;

        fugir(
            toque.clientX,
            toque.clientY
        );

    },
    { passive: true }
);


// CLIQUE NO BOTÃO
botao.addEventListener("click", () => {

    cliques++;

    // Ainda não chegou aos 4 cliques
    if (cliques < 4) {

        botao.textContent =
            `${cliques}/4 ❤️`;

        return;
    }


    // 4 CLIQUES = DESBLOQUEIA
    const surpresa =
        document.getElementById("surpresa");

    const musica =
        document.getElementById("musica");

    surpresa.style.display = "flex";

    botao.style.display = "none";


    // Música
    musica.play().catch(() => {
        console.log("Autoplay bloqueado pelo navegador.");
    });


    // Corações
    for (let i = 0; i < 20; i++) {

        setTimeout(() => {
            criarCoracao();
        }, i * 150);

    }

});


// CRIAR CORAÇÕES
function criarCoracao() {

    const coracao =
        document.createElement("div");

    coracao.innerHTML = "❤️";

    coracao.style.position = "fixed";

    coracao.style.left =
        Math.random() * 100 + "vw";

    coracao.style.bottom =
        "-30px";

    coracao.style.fontSize =
        (15 + Math.random() * 25) + "px";

    coracao.style.zIndex =
        "9999";

    coracao.style.pointerEvents =
        "none";

    document.body.appendChild(coracao);

    const duracao =
        3000 + Math.random() * 3000;

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

    setTimeout(() => {
        coracao.remove();
    }, duracao);
}
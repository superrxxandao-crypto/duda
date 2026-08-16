const botao = document.getElementById("botaoFujao");

botao.addEventListener("touchstart", function(e) {
    e.preventDefault();

    alert("TOQUE FUNCIONOU!");
}, { passive: false });

botao.addEventListener("click", function() {
    alert("CLIQUE FUNCIONOU!");
});

setInterval(function() {

    botao.style.position = "fixed";

    botao.style.left =
        Math.random() *
        (window.innerWidth - botao.offsetWidth) +
        "px";

    botao.style.top =
        Math.random() *
        (window.innerHeight - botao.offsetHeight) +
        "px";

}, 1000);

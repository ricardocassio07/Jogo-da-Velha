var vez = "";
var vencedor = "";
var interval;
var segundos = 0;
var minutos = 0;

function formatarTempo(valor) {
    return valor < 10 ? "0" + valor : valor;
}

function iniciarCronometro() {
    interval = setInterval(function() {
        segundos++;
        if (segundos === 60) {
            minutos++;
            segundos = 0;
        }
        document.getElementById("cronometroDisplay").value = formatarTempo(minutos) + ":" + formatarTempo(segundos);
    }, 1000);
}

function pararCronometro() {
    clearInterval(interval);
}

function realizarSorteio() {
    let sorteio = Math.random();
    vez = sorteio < 0.5 ? "X" : "O";
    document.getElementById("principalDisplay").value = "É a vez do jogador: " + vez;
    document.getElementById("sortear").style.display = "none";
    document.getElementById("displayContainerInformativo").style.display = "none";
    document.getElementById("displayContainerJogo").style.display = "";

    // Habilitar botões
    var botoes = document.querySelectorAll(".btn");
    botoes.forEach(function(botao) {
        botao.disabled = false;
        botao.classList.add("habilitado");
    });

    // Iniciar cronômetro
    iniciarCronometro();
}

function btn(posicao) {
    var botoes = document.querySelectorAll(".btn");
    var botao = botoes[posicao - 1];

    if (botao.innerText === "|") {
        botao.innerText = vez;
        botao.classList.add("clicado");
        verificarVelha();
        if (vencedor === "") {
            vez = vez === "X" ? "O" : "X";  // Alterna a vez
            document.getElementById("principalDisplay").value = "É a vez do jogador: " + vez;
        } else {
            pararCronometro();
        }
    }
}

function verificarVelha() {
    var botoes = document.querySelectorAll(".btn");
    var combinacoesVencedoras = [
        [0, 1, 2], // Linha 1
        [3, 4, 5], // Linha 2
        [6, 7, 8], // Linha 3
        [0, 3, 6], // Coluna 1
        [1, 4, 7], // Coluna 2
        [2, 5, 8], // Coluna 3
        [0, 4, 8], // Diagonal principal
        [2, 4, 6]  // Diagonal secundária
    ];

    combinacoesVencedoras.forEach(function(combinacao) {
        var [a, b, c] = combinacao;
        if (botoes[a].innerText !== "|" && botoes[a].innerText === botoes[b].innerText && botoes[a].innerText === botoes[c].innerText) {
            vencedor = botoes[a].innerText;
            document.getElementById("principalDisplay").value = "O jogador " + vencedor + " venceu!";
            botoes.forEach(function(botao) {
                botao.disabled = true;
            });
            pararCronometro();
            voltarInicio();
        }
    });

    // Verificar se todos os botões foram clicados (empate)
    var todosClicados = Array.from(botoes).every(function(botao) {
        return botao.innerText !== "|";
    });

    if (todosClicados && vencedor === "") {
        document.getElementById("principalDisplay").value = "Empate!";
        pararCronometro();
        voltarInicio();
    }
}

function voltarInicio(){
    document.getElementById("painelVencedor").style.display = "flex";
    document.getElementById("container").classList.add("containerBorrado");

    document.querySelectorAll(".btn").forEach(function(element) {
        element.classList.add("Borrado");
    });

    if(vencedor !== ""){
        document.getElementById("mensagemVencedor").textContent =
            "Parabéns, jogador " + vencedor + ", você ganhou!";
    } else {
        document.getElementById("mensagemVencedor").textContent =
            "A partida acabou empatada!";
    }
}


function reiniciarJogo(){
    vez = "";
    vencedor = "";
    clearInterval(interval); // Certifique-se de parar o cronômetro

    // Resetar o tempo
    segundos = 0;
    minutos = 0;
    document.getElementById("cronometroDisplay").value = "00:00";

    document.getElementById("painelVencedor").style.display = "none";

    // Desabilitar os botões
    var botoes = document.querySelectorAll(".btn");
    botoes.forEach(function(botao) {
        botao.disabled = true;
        botao.classList.remove("habilitado");
        botao.textContent = "|";
        botao.classList.remove("clicado");
    });

    document.getElementById("container").classList.remove("containerBorrado");
    document.querySelectorAll(".btn").forEach(function(element) {
        element.classList.remove("Borrado");
    });

    document.getElementById("sortear").style.display = "flex";
    document.getElementById("displayContainerInformativo").style.display = "flex";
    document.getElementById("displayContainerJogo").style.display = "none";
}

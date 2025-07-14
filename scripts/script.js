const mensagem = document.querySelector(".mensagem");
const inputDescricao = document.getElementById("desc");
const inputValor = document.getElementById("valor");
const selectTipo = document.getElementById("tipo");
const inputData = document.getElementById("data");

const saida = document.getElementById("saida");
const total = document.getElementById("total");
const cardEntradaSpan = document.getElementById("entrada");

document.addEventListener("DOMContentLoaded", function () {
    mostraMensagemStatus();
});

function concluir() {
    registraTransacao();
}

function limpaCampo() {
    setTimeout(() => {
        inputValor.value = "";
        inputDescricao.value = "";
        inputData.value = "";
    }, 1000);
}

let totalEntradas = 0;
let totalSaidas = 0;
let totalGeral = 0;
const cardClasificacao = document.querySelector(".selo-classificacao");

function mostraMensagemStatus() {
    const mensagemStatus = document.getElementById("msg-status-user");
    const valorEntradaAtual = parseFloat(cardEntradaSpan.textContent);

    // const porcentagemDeGastos = (saida / valorEntradaAtual) * 100;

    // aqui ok-----------------------------------
    if (valorEntradaAtual === 0 && totalGeral === 0 && totalSaidas === 0) {
        mensagemStatus.textContent =
            "Olá, 👍 seja muito bem vindo! Insira um valor de entrada e comece a controlar os seus gastos.";
        mensagemStatus.style.fontSize = "0.6em ";
        cardClasificacao.style.background = "#1ba7fe";
    
    }

   else if (totalSaidas > totalEntradas) {
        mensagemStatus.textContent = "🚨 Cuidado você já está com saldo negativo.";
        cardClasificacao.style.background = "red";
    }

    // aqui ok------------------------------------------
    else if (totalEntradas > 0) {
        mensagemStatus.textContent = "Vamos lá!";
        cardClasificacao.style.background = "#1ba7fe";

        // aqui ok -----------------------------------------
    } else if (totalEntradas === 0 && totalSaidas > 0) {
        mensagemStatus.textContent =
            "ATENÇÃO! ⚠️ Você tem gastos mas ainda não registrou entradas.";
        cardClasificacao.style.background = "red";
    }
}

const camposEntrada = document.querySelectorAll("input");

const iconTipo = document.querySelector(".fa-solid");

function registraTransacao() {
    const tipo = selectTipo.value;
    const descricao = inputDescricao.value.trim();
    const valor = parseFloat(inputValor.value.trim());
    const data = inputData.value.trim();

    if (descricao === "") {
        inputDescricao.style.outline = "solid 2px transparent";
        inputDescricao.style.outlineColor = "red";

        inputValor.style.outline = "solid 2px transparent";
        inputValor.style.outlineColor = "red";

        inputData.style.outline = "solid 2px transparent";
        inputData.style.outlineColor = "red";

        mensagem.textContent = "*Insira os valores*";
        mensagem.style.color = "red";
        setTimeout(() => {
            mensagem.textContent = "";
            inputDescricao.style.outlineColor = "transparent";

            inputValor.style.outlineColor = "transparent";

            inputData.style.outlineColor = "transparent";
        }, 2000);
        return;
    }

    if (valor <= 0 || isNaN(valor)) {
        mensagem.textContent = "*Insira um valor*";
        mensagem.style.color = "red";

        inputValor.style.outline = "solid 2px transparent";
        inputValor.style.outlineColor = "red";

        inputData.style.outline = "solid 2px transparent";
        inputData.style.outlineColor = "red";

        setTimeout(() => {
            mensagem.textContent = "";
            inputValor.style.outlineColor = "transparent";

            inputData.style.outlineColor = "transparent";
        }, 2000);
        return;
    }

    if (data === "") {
        mensagem.textContent = "*Não é possível fazer um controle sem a data*";
        mensagem.style.color = "red";

        inputData.style.outline = "solid 2px transparent";
        inputData.style.outlineColor = "red";

        setTimeout(() => {
            mensagem.textContent = "";
            inputData.style.outlineColor = "transparent";
        }, 2000);
        return;
    } else {
        inputDescricao.style.outlineColor = "green";
        inputValor.style.outlineColor = "green";
        inputData.style.outlineColor = "green";

        mensagem.textContent = "Controle inserido com sucesso!";
        mensagem.style.color = "green";
        limpaCampo();
        setTimeout(() => {
            inputDescricao.style.outlineColor = "transparent";
            inputValor.style.outlineColor = "transparent";
            inputData.style.outlineColor = "transparent";
            mensagem.textContent = "";
        }, 1000);
    }

    let iconTipo;

    if (tipo === "entrada") {
        iconTipo = "fa-solid fa-circle-arrow-up seta-entrada";
        totalEntradas += valor;
        totalGeral += valor;
        cardEntradaSpan.textContent = totalEntradas.toFixed(2);
    } else if (tipo === "saida") {
        iconTipo = "fa-solid fa-circle-arrow-down seta-saida";
        totalSaidas += valor;
        totalGeral -= valor;
    }
    if (totalEntradas <= 0) {
        cardEntradaSpan.style.color = "red";
    } else {
        cardEntradaSpan.style.color = "#000";
    }
    if (totalGeral <= 0) {
        total.style.color = "red";
    } else {
        total.style.color = "#000";
    }

    total.textContent = totalGeral.toFixed(2);
    saida.textContent = totalSaidas.toFixed(2);

    let tbody = document.getElementById("corpo-tabela");

    tbody.innerHTML += `<tr>
                    <td>${descricao}</td>
                        <td>R$ ${valor.toFixed(2)}</td>
                        <td>${data}</td>
                        <td>
                      
                            <i
                                class="${iconTipo}"
                            ></i>
                        </td>
                        <td><i class="fa-solid fa-trash"></i></td>
                    </tr>`;
    mostraMensagemStatus();
}

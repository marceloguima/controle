const mensagemTitulo = document.getElementById("mensagem-titulo");
const mensagem = document.querySelector(".mensagem");
const inputDescricao = document.getElementById("desc");
const inputValor = document.getElementById("valor");
const selectTipo = document.getElementById("tipo");
const inputData = document.getElementById("data");

const saida = document.getElementById("saida");
const total = document.getElementById("total");
const cardEntradaSpan = document.getElementById("entrada");

const nomeCadastrado = localStorage.getItem("nome");

document.addEventListener("DOMContentLoaded", function () {
    mostraMensagemStatus();

    // Define a data de hoje como padrão no campo de data
    const hoje = new Date().toISOString().split("T")[0];
    inputData.value = hoje;
});

function mostraMensagemTitulo() {
    const nome = nomeDoUsuario.value.trim();
    mensagemTitulo.textContent = `Olá ${nome} controle seus gastos com eficiência.`;
}

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
const cardClassificacao = document.querySelector(".selo-classificacao");

function mostraMensagemStatus() {
    const mensagemStatus = document.getElementById("msg-status-user");
    // const valorEntradaAtual = parseFloat(cardEntradaSpan.textContent);

    if (
        !mensagemStatus ||
        !cardClassificacao ||
        !cardEntradaSpan ||
        !saida ||
        !total
    ) {
        console.error(
            "Erro: Um ou mais elementos DOM necessários para mostraMensagemStatus não foram encontrados."
        );
        return;
    }

    let textoPrincipal = "";
    let corDoCard = "";
    let corDoTexto = "#000"; //padrão
    let emoji = "";
    let fontSize = "1em"; //padrão

    if (totalGeral < 0) {
        textoPrincipal = `🚨 Cuidado ${nomeCadastrado}! você está com saldo negativo.`;
        corDoCard = "red";
        corDoTexto = "#fff";
    } else if (totalGeral === 0 && (totalEntradas > 0 || totalSaidas > 0)) {
        // mensagemStatus.textContent = "Ops!😬 Agora você ficou sem saldo."
        //  cardClassificacao.style.background = "orange";
        textoPrincipal = "Ops! Agora você ficou sem saldo.";
        corDoCard = "orange";
        corDoTexto = "black";
        emoji = "😬";
    } else if (totalEntradas > 0 && totalSaidas > totalEntradas) {
        textoPrincipal = `CUIDADO ${nomeCadastrado}! Você já gastou mais do que ganhou neste período.`;
        corDoCard = "red";
        corDoTexto = "white";
        emoji = "⚠️";
    } // O usuário está gastando, mas não informou nenhuma entrada.
    else if (totalEntradas === 0 && totalSaidas > 0) {
        textoPrincipal = `ATENÇÃO ${nomeCadastrado}! Você tem gastos mas ainda não registrou entradas.`;
        corDoCard = "red";
        corDoTexto = "white";
        emoji = "⚠️";
    } else if (totalEntradas === 0 && totalSaidas === 0 && totalGeral === 0) {
        textoPrincipal = `Olá ${nomeCadastrado}, seja muito bem vindo(a)! Insira um valor para começar.`;
        corDoCard = "#1ba7fe";
        corDoTexto = "white";
        emoji = "👋";
        fontSize = "0.8em";
    } else {
        // mensagens baseadas em percentual gastos
        const porcentagemDeGastos = (totalSaidas / totalEntradas) * 100;

        if (porcentagemDeGastos > 90) {
            textoPrincipal = `Cuidado ${nomeCadastrado} Você já gastou ${porcentagemDeGastos}% das suas entradas.`;
            corDoCard = "#fd7e14";
            corDoTexto = "white";
            emoji = "🚨";
        } else if (porcentagemDeGastos > 70) {
            textoPrincipal = `Ei ${nomeCadastrado} Você já gastou ${porcentagemDeGastos}% das suas entradas.`;
            corDoCard = "#ffc107";
            corDoTexto = "black";
            emoji = "⚠️";
        } else if (porcentagemDeGastos > 50) {
            textoPrincipal = `Você já gastou ${porcentagemDeGastos}% das suas entradas.`;
            corDoCard = "#007bff";
            corDoTexto = "white";
            emoji = "👍";
        } else if (porcentagemDeGastos > 30) {
            textoPrincipal = `Oi ${nomeCadastrado} Você gastou ${porcentagemDeGastos}% das suas entradas.`;
            corDoCard = "#28a745";
            corDoTexto = "white";
            // emoji = "👌";
        } else {
            textoPrincipal = `Fique tranquilo ${nomeCadastrado}, vou te ajudar a monitorar as suas finanças.`;
            corDoCard = "#28a745";
            corDoTexto = "white";
        }
    }
    mensagemStatus.textContent = `${emoji} ${textoPrincipal}`;
    mensagemStatus.style.color = corDoTexto;
    cardClassificacao.style.background = corDoCard;
    mensagemStatus.style.fontSize = fontSize;
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
    }else {
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

const mensagem = document.querySelector(".mensagem");
const inputDescricao = document.getElementById("desc");
const inputValor = document.getElementById("valor");
const selectTipo = document.getElementById("tipo");
const inputData = document.getElementById("data");

const saida = document.getElementById("saida");
const total = document.getElementById("total");

function concluir() {
    campoVazio();
    registraTransacao();
    mostarDadosNaTabela();
}

function campoVazio() {
    const descricao = inputDescricao.value.trim();
    const valor = inputValor.value.trim();
    const data = inputData.value.trim();

    if (descricao === "" || valor === "" || data === "") {
        mudaCorOutline("red");
        mensagem.textContent = "*Preencha todos os campos*";
        mensagem.style.color = "red";
        setTimeout(() => {
            mensagem.textContent = "";
            mudaCorOutline("transparent");
        }, 2000);
        return;
    } else {
        mudaCorOutline("green");
        mensagem.textContent = "Controle inserido com sucesso!";
        mensagem.style.color = "green";
        setTimeout(() => {
            mudaCorOutline("transparent");
            mensagem.textContent = "";
        }, 1000);
        return;
    }
}

const camposEntrada = document.querySelectorAll("input");

function mudaCorOutline(cor) {
    camposEntrada.forEach((inputElemento) => {
        inputElemento.style.outline = "solid 2px transparent";
        inputElemento.style.outlineColor = cor;
    });
}

const valorEntrada = document.getElementById("entrada");

const iconTipo = document.querySelector(".fa-solid")

function registraTransacao() {
    let totalEntradas = 0;
    let totalSaidas = 0;
    let totalGeral = 0;
    const valor = parseFloat(inputValor.value.trim());
    const tipo = selectTipo.value;
    if (valor <= 0) {
        mensagem.textContent = "Insira um número válido";
        mensagem.style.color = "red";
        mudaCorOutline("red");
    }

    if (tipo === "entrada") {
        totalEntradas += valor;
        totalGeral += valor;
        iconTipo.classList.add("fa-circle-arrow-up")
    } else if (tipo === "saida") {
        totalSaidas += valor;
        totalGeral -= valor;
    }

    valorEntrada.textContent = `Entradas R$: ${totalEntradas}`;
    total.textContent = `Total R$: ${totalGeral}`;
    saida.textContent = `Saída R$: ${totalSaidas}`;
}

function mostarDadosNaTabela() {
    
    const descricao = inputDescricao.value.trim();
    const data = inputData.value.trim();
    let tbody = document.getElementById("corpo-tabela");
    const valor = parseFloat(inputValor.value.trim());

    tbody.innerHTML = `<tr>
                    <td>${descricao}</td>
                        <td>${valor}</td>
                        <td>${data}</td>
                        <td>
                            <i
                                class="fa-solid  seta-entrada"
                            ></i>
                        </td>
                        <td><i class="fa-solid fa-trash"></i></td>
                    </tr>`;
                   
}

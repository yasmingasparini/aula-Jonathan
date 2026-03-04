// Passo 3 — Estrutura de dados
let participantes = [];

// Elementos
const inputNome = document.getElementById("inputNome");
const btnAdicionar = document.getElementById("btnAdicionar");
const btnSortear = document.getElementById("btnSortear");
const listaParticipantes = document.getElementById("listaParticipantes");
const resultadoDiv = document.getElementById("resultado");

// Evento botão adicionar
btnAdicionar.addEventListener("click", adicionarParticipante);
btnSortear.addEventListener("click", realizarSorteio);

// Passo 4
function adicionarParticipante() {
    const nome = inputNome.value.trim();

    if (nome === "") {
        alert("Digite um nome válido!");
        return;
    }

    const novoParticipante = {
        nome: nome,
        sorteado: null
    };

    participantes.push(novoParticipante);

    inputNome.value = "";

    renderizarLista();
}

function renderizarLista() {
    listaParticipantes.innerHTML = "";

    for (const participante of participantes) {
        const li = document.createElement("li");
        li.textContent = participante.nome;
        listaParticipantes.appendChild(li);
    }
}

// Passo 5
function realizarSorteio() {

    if (participantes.length < 3) {
        alert("É necessário pelo menos 3 participantes!");
        return;
    }

    let nomesSorteio = participantes.map(p => p.nome);
    let valido = false;

    while (!valido) {

        nomesSorteio.sort(() => Math.random() - 0.5);

        valido = true;

        for (let i = 0; i < participantes.length; i++) {
            if (participantes[i].nome === nomesSorteio[i]) {
                valido = false;
                break;
            }
        }
    }

    for (let i = 0; i < participantes.length; i++) {
        participantes[i].sorteado = nomesSorteio[i];
    }

    montarCartoes();
}

// Passo 6
function montarCartoes() {

    resultadoDiv.innerHTML = "";

    for (const participante of participantes) {

        const card = document.createElement("div");
        card.classList.add("card");

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        const front = document.createElement("div");
        front.classList.add("front");
        front.innerHTML = `<strong>${participante.nome}</strong><br>Clique para revelar`;

        const back = document.createElement("div");
        back.classList.add("back");
        back.innerHTML = `Você tirou:<br><br><strong>${participante.sorteado}</strong>`;

        cardInner.appendChild(front);
        cardInner.appendChild(back);
        card.appendChild(cardInner);

        card.addEventListener("click", function() {
            card.classList.toggle("flip");
        });

        resultadoDiv.appendChild(card);
    }
}
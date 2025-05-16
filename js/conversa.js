// js/conversa.js

const frases = [
  { texto: "Olá", imagem: "ola.png" },
  { texto: "Sim", imagem: "sim.png" },
  { texto: "Não", imagem: "nao.png" },
  { texto: "Obrigado", imagem: "obrigado.png" },
  { texto: "Por favor", imagem: "por-favor.png" },
  { texto: "Desculpa", imagem: "desculpa.png" },
  { texto: "Como te chamas?", imagem: "nome.png" },
  { texto: "Quero conversar", imagem: "conversar.png" },
  { texto: "Podes ajudar-me?", imagem: "ajuda.png" },
  { texto: "Estou feliz", imagem: "feliz.png" },
  { texto: "Estou triste", imagem: "triste.png" },
  { texto: "Tenho fome", imagem: "fome.png" },
  { texto: "Tenho frio", imagem: "frio.png" }
];

const container = document.getElementById("conversa-container");
const fraseEl = document.getElementById("frase");

let frase = "";

// Criar botões
frases.forEach(item => {
  const btn = document.createElement("button");
  btn.className = "simbolo-btn";

  btn.innerHTML = `
    <img src="assets/icons/${item.imagem}" alt="${item.texto}" />
    <span>${item.texto}</span>
  `;

  btn.onclick = () => {
    frase += item.texto + " ";
    fraseEl.textContent = frase;
  };

  container.appendChild(btn);
});

function falarFrase() {
  if (frase.trim() === "") return;
  const utter = new SpeechSynthesisUtterance(frase);
  speechSynthesis.speak(utter);
}

function limparFrase() {
  frase = "";
  fraseEl.textContent = "";
}

function voltarInicio() {
  window.location.href = "index.html";
}

function guardarFraseFavorita() {
  const frase = fraseArray.join(" ").trim();
  if (!frase) return;

  let favoritas = JSON.parse(localStorage.getItem("frasesFavoritas")) || [];
  if (!favoritas.includes(frase)) {
    favoritas.push(frase);
    localStorage.setItem("frasesFavoritas", JSON.stringify(favoritas));
    alert("Frase guardada como favorita!");
  } else {
    alert("Esta frase já está guardada.");
  }
}


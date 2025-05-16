const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get("cat");

const titulo = document.getElementById("titulo-categoria");
const simbolosContainer = document.getElementById("simbolos-container");
const fraseEl = document.getElementById("frase");

let frase = "";

// Atualiza título
titulo.textContent = categoria.replace("_", " ").toUpperCase();

// Carrega símbolos do ficheiro JSON
fetch("data/simbolos.json")
  .then(res => res.json())
  .then(data => {
    const simbolos = data[categoria] || [];
    simbolos.forEach(s => {
      const btn = document.createElement("button");
      btn.className = "simbolo-btn";
      btn.innerHTML = `
        <img src="assets/icons/${s.imagem}" alt="${s.texto}" />
        <span>${s.texto}</span>
      `;
      btn.onclick = () => {
        frase += s.texto + " ";
        fraseEl.textContent = frase;
      };
      simbolosContainer.appendChild(btn);
    });
  });

// Carrega símbolos personalizados do localStorage
const personalizados = JSON.parse(localStorage.getItem("simbolosPersonalizados_" + categoria)) || [];
personalizados.forEach((s, index) => {
  const btn = document.createElement("button");
  btn.className = "simbolo-btn";
  btn.innerHTML = `
    <img src="${s.imagem}" alt="${s.texto}" />
    <span>${s.texto}</span>
    <button class="remover-simbolo" onclick="removerSimboloPersonalizado(${index})">❌</button>
  `;
  btn.onclick = (e) => {
    if (e.target.tagName !== "BUTTON") {
      frase += s.texto + " ";
      fraseEl.textContent = frase;
    }
  };
  simbolosContainer.appendChild(btn);
});

// Remoção de símbolo personalizado
function removerSimboloPersonalizado(index) {
  const chave = "simbolosPersonalizados_" + categoria;
  const personalizados = JSON.parse(localStorage.getItem(chave)) || [];
  personalizados.splice(index, 1);
  localStorage.setItem(chave, JSON.stringify(personalizados));
  location.reload();
}

// Funções de interação
function falarFrase() {
  if (frase.trim() === "") return;
  const utter = new SpeechSynthesisUtterance(frase);
  speechSynthesis.speak(utter);
}

function limparFrase() {
  frase = "";
  fraseEl.textContent = "";
}

function apagarUltima() {
  const palavras = frase.trim().split(" ");
  palavras.pop();
  frase = palavras.join(" ") + " ";
  fraseEl.textContent = frase;
}

function guardarFraseFavorita() {
  const favoritas = JSON.parse(localStorage.getItem("frasesFavoritas") || "[]");
  if (frase.trim()) {
    favoritas.push(frase.trim());
    localStorage.setItem("frasesFavoritas", JSON.stringify(favoritas));
    alert("Frase guardada com sucesso!");
  }
}

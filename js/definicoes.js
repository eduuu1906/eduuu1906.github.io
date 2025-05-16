function voltarInicio() {
  window.location.href = "index.html";
}

function mostrarFavoritas() {
  const container = document.getElementById("favoritas-container");
  container.style.display = "block";

  const lista = document.getElementById("lista-favoritas");
  lista.innerHTML = "";

  const favoritas = JSON.parse(localStorage.getItem("frasesFavoritas")) || [];

  if (favoritas.length === 0) {
    lista.innerHTML = "<p>Sem frases favoritas guardadas.</p>";
    return;
  }

  favoritas.forEach((frase, index) => {
    const div = document.createElement("div");
    div.className = "frase-favorita";
    div.innerHTML = `
      <p>${frase}</p>
      <div class="botoes-frase">
        <button onclick="falar('${frase}')">🔊 Falar</button>
        <button onclick="apagar(${index})">🗑️ Limpar</button>
      </div>
    `;
    lista.appendChild(div);
  });
}

function falar(texto) {
  const utter = new SpeechSynthesisUtterance(texto);
  speechSynthesis.speak(utter);
}

function apagar(index) {
  const favoritas = JSON.parse(localStorage.getItem("frasesFavoritas")) || [];
  favoritas.splice(index, 1);
  localStorage.setItem("frasesFavoritas", JSON.stringify(favoritas));
  mostrarFavoritas();
}

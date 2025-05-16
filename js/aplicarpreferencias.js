// aplicarpreferencias.js (versão anterior com cor de fundo)
document.addEventListener("DOMContentLoaded", () => {
  const cor = localStorage.getItem("corFundo") || "#f4f4f4";
  const escuro = localStorage.getItem("modoEscuro") === "true";
  const tamanho = localStorage.getItem("tamanhoBotoes") || "medio";

  document.body.style.backgroundColor = cor;
  aplicarContrasteAutomatico(cor);

  if (escuro) {
    document.body.classList.add("escuro");
  } else {
    document.body.classList.remove("escuro");
  }

  document.documentElement.setAttribute("data-tamanho", tamanho);
});

function aplicarContrasteAutomatico(corHex) {
  if (!corHex) return;

  const r = parseInt(corHex.substr(1, 2), 16);
  const g = parseInt(corHex.substr(3, 2), 16);
  const b = parseInt(corHex.substr(5, 2), 16);

  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  document.body.style.color = luminancia > 0.5 ? "black" : "white";
}

document.addEventListener("DOMContentLoaded", () => {
  const cor = localStorage.getItem("corFundo") || "#e0f7fa"; // Cor padrão
  const escuro = localStorage.getItem("modoEscuro") === "true";

  // Aplicar cor de fundo ao gradiente
  document.body.style.setProperty("--cor-fundo-primaria", cor);

  // Aplicar modo escuro
  if (escuro) {
    document.body.classList.add("escuro");
    document.body.style.setProperty("--cor-fundo-primaria", "#1e1e1e");
    document.body.style.setProperty("--cor-fundo-secundaria", "#333");
  }
});

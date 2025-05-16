// js/main.js

// Lista das categorias com nomes e ícones
const categorias = [
  { id: "comida", nome: "Comida", icon: "pao.png", temSubcategorias: true },
  { id: "educacao", nome: "Educação", icon: "livro.png", temSubcategorias: true },
  { id: "em_casa", nome: "Em Casa", icon: "tv.png", temSubcategorias: true },
  { id: "emergencia", nome: "Emergência", icon: "emergencia.png", temSubcategorias: true },
  { id: "conversa", nome: "Conversa", icon: "conversar.png" },
  { id: "lazer", nome: "Lazer", icon: "lazer.png", temSubcategorias: true },

];

const container = document.getElementById("categorias-container");

categorias.forEach(cat => {
  const btn = document.createElement("button");
  btn.className = "categoria-btn";

  btn.innerHTML = `
    <img src="assets/icons/${cat.icon}" alt="${cat.nome}" />
    <span>${cat.nome}</span>
  `;

  btn.onclick = () => {
    const destino = cat.temSubcategorias ? "subcategoria" : "categoria";
    window.location.href = `${destino}.html?cat=${cat.id}`;
  };

  container.appendChild(btn);
});

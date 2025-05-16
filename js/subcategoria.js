const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get("cat");

const titulo = document.getElementById("titulo-subcategoria");
const container = document.getElementById("subcategorias-container");
const fraseEl = document.getElementById("frase");

titulo.textContent = categoria.replace("_", " ").toUpperCase();

let fraseArray = [];

function atualizarFrase() {
  fraseEl.textContent = fraseArray.join(" ");
}

function falarFrase() {
  if (fraseArray.length === 0) return;
  const utter = new SpeechSynthesisUtterance(fraseArray.join(" "));
  speechSynthesis.speak(utter);
}

function apagarUltima() {
  fraseArray.pop();
  atualizarFrase();
}

function limparFrase() {
  fraseArray = [];
  atualizarFrase();
}

function guardarFraseFavorita() {
  if (fraseArray.length === 0) return;
  const favoritas = JSON.parse(localStorage.getItem("frasesFavoritas") || "[]");
  favoritas.push(fraseArray.join(" "));
  localStorage.setItem("frasesFavoritas", JSON.stringify(favoritas));
  alert("Frase guardada com sucesso!");
}


fetch("data/simbolos.json")
  .then(res => res.json())
  .then(data => {
    const simbolos = data[categoria];
    if (simbolos) {
      simbolos.forEach(s => {
        const btn = document.createElement("button");
        btn.className = "simbolo-btn";

        btn.innerHTML = `
          <img src="assets/icons/${s.imagem}" alt="${s.texto}" />
          <span>${s.texto}</span>
        `;

        btn.onclick = () => {
          fraseArray.push(s.texto);
          atualizarFrase();
        };

        container.appendChild(btn);
      });
    }

    // Subcategorias específicas por categoria
    const subcategoriasPorCategoria = {
      comida: [
        {id: "fruta", nome: "Quero fruta", icon: "fruta.png"},
        {id: "vegetais", nome: "Quero vegetais", icon: "vegetais.png"},
        {id: "bebida", nome: "Quero bebidas", icon: "bebida.png"},
        {id: "sobremesas", nome: "Quero sobremesa", icon: "sobremesa.png"},
        { id: "pequeno_almoco", nome: "Pequeno-almoço", icon: "pequeno-almoco.png" },
        { id: "almoco", nome: "Almoço", icon: "almoco.png" },
        { id: "lanche", nome: "Lanche", icon: "lanche.png" },
        { id: "jantar", nome: "Jantar", icon: "jantar.png" }
        
      ],
      emergencia: [
        { id: "tipodedor", nome: "Estou com dores", icon: "respirar.png" }
      ],
      educacao: [
        { id: "escola", nome: "Escola", icon: "livro.png" },
        { id: "materiais", nome: "Materiais", icon: "material.png" }
      ],
      em_casa: [
        { id: "higiene", nome: "Higiene e cuidados pessoais", icon: "higiene.png" },
      ],
      lazer: [
        { id: "desportos", nome: "Desportos e jogos", icon: "jogos.png" },
        { id: "musica", nome: "Música", icon: "musica.png" }
      ]
      
    };

    const subcats = subcategoriasPorCategoria[categoria];
    if (subcats) {
      subcats.forEach(sub => {
        const btn = document.createElement("button");
        btn.className = "subcategoria-btn";

        btn.innerHTML = `
          <img src="assets/icons/${sub.icon}" alt="${sub.nome}" />
          <span>${sub.nome}</span>
        `;

        btn.onclick = () => {
          window.location.href = `categoria.html?cat=${sub.id}`;
        };

        container.appendChild(btn);
      });
    }

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
          fraseArray.push(s.texto);
          atualizarFrase();
        }
      };
      container.appendChild(btn);
    });
  });

// Remoção de símbolo personalizado
function removerSimboloPersonalizado(index) {
  const chave = "simbolosPersonalizados_" + categoria;
  const personalizados = JSON.parse(localStorage.getItem(chave)) || [];
  personalizados.splice(index, 1);
  localStorage.setItem(chave, JSON.stringify(personalizados));
  location.reload();
} 

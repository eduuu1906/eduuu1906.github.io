document.addEventListener("DOMContentLoaded", () => {
  const cor = localStorage.getItem("corFundo") || "#e0f7fa"; // Cor padrão do gradiente
  const escuro = localStorage.getItem("modoEscuro") === "true";
  const tamanho = localStorage.getItem("tamanhoBotoes") || "medio";

  // Aplicar cor de fundo ao gradiente
  document.body.style.setProperty("--cor-fundo-primaria", cor);

  // Aplicar modo escuro
  if (escuro) {
    document.body.classList.add("escuro");
    document.body.style.setProperty("--cor-fundo-primaria", "#1e1e1e");
    document.body.style.setProperty("--cor-fundo-secundaria", "#333");
  }

  // Atualizar inputs
  const corInput = document.getElementById("cor-fundo");
  if (corInput) corInput.value = cor;

  const modoEscuroInput = document.getElementById("modo-escuro");
  if (modoEscuroInput) modoEscuroInput.checked = escuro;

  const tamanhoRadio = document.querySelector(`input[name="tamanho"][value="${tamanho}"]`);
  if (tamanhoRadio) tamanhoRadio.checked = true;
});

function guardarPreferencias() {
  const cor = document.getElementById("cor-fundo").value;
  const escuro = document.getElementById("modo-escuro").checked;
  const tamanho = document.querySelector("input[name='tamanho']:checked")?.value || "medio";

  // Salvar preferências no localStorage
  localStorage.setItem("corFundo", cor);
  localStorage.setItem("modoEscuro", escuro);
  localStorage.setItem("tamanhoBotoes", tamanho);

  alert("Preferências guardadas!");
  location.reload();
}

function voltarInicio() {
  window.location.href = "index.html";
}

function guardarSimboloPersonalizado() {
  const imagemInput = document.getElementById("icone-simbolo");
  const textoInput = document.getElementById("texto-simbolo");
  const categoriaInput = document.getElementById("categoria-simbolo");

  const imagem = imagemInput.files[0];
  const texto = textoInput.value.trim();
  const categoria = categoriaInput.value;

  if (!imagem || !texto || !categoria) {
    alert("Preencha todos os campos.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const novoSimbolo = {
      texto: texto,
      imagem: e.target.result
    };

    const chave = "simbolosPersonalizados_" + categoria;
    const lista = JSON.parse(localStorage.getItem(chave)) || [];
    lista.push(novoSimbolo);
    localStorage.setItem(chave, JSON.stringify(lista));

    alert("Símbolo adicionado com sucesso!");
    imagemInput.value = "";
    textoInput.value = "";
    categoriaInput.selectedIndex = 0;
  };

  reader.readAsDataURL(imagem);
}
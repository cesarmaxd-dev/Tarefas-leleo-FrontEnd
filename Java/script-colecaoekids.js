let carrinho = [];
let total = 0;

// Formata preço em Real (BRL)
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Abre o carrinho
function abrirCarrinho() {
  document.getElementById("carrinho-barra").classList.add("ativo");
}

// Fecha o carrinho
function fecharCarrinho() {
  document.getElementById("carrinho-barra").classList.remove("ativo");
}

// Fecha carrinho ao clicar fora dele
document.addEventListener("click", function (event) {
  const carrinhoEl = document.getElementById("carrinho-barra");

  if (
    !carrinhoEl.contains(event.target) &&
    !event.target.matches("button[onclick^='adicionarCarrinho']")
  ) {
    fecharCarrinho();
  }
});

// Adiciona produto ao carrinho
function adicionarCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  total += preco;
  atualizarCarrinho();
  abrirCarrinho();
  mostrarNotificacao(`${nome} adicionado ao carrinho!`);
}

// Remove item do carrinho
function removerItem(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  atualizarCarrinho();
  event.stopPropagation();
  mostrarNotificacao("Item removido do carrinho.");
}

// Atualiza carrinho
function atualizarCarrinho() {
  const lista = document.getElementById("itens-carrinho");
  const totalEl = document.getElementById("total");
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    lista.innerHTML = `<li style="color:#aaa; text-align:center;">Carrinho vazio 🛒</li>`;
  }

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nome} - ${formatarPreco(item.preco)}</span>
      <button class="remover" onclick="removerItem(${index})">Remover</button>
    `;
    lista.appendChild(li);
  });

  totalEl.textContent = `Total: ${formatarPreco(total)}`;
}

// Finaliza compra
document.querySelector(".finalizar")?.addEventListener("click", () => {
  if (carrinho.length === 0) {
    mostrarNotificacao("Seu carrinho está vazio! 🚫");
    return;
  }

  if (confirm(`Deseja finalizar a compra no valor de ${formatarPreco(total)}?`)) {
    carrinho = [];
    total = 0;
    atualizarCarrinho();
    fecharCarrinho();
    mostrarNotificacao("Compra finalizada com sucesso! ✅");
  }
});
// Adiciona um produto ao carrinho
function adicionarCarrinho(nome, preco) {
  carrinho.push({ nome, preco });

  // salva no localStorage
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  total += preco;
  atualizarCarrinho();
  abrirCarrinho();
}

// Remove um produto do carrinho
function removerItem(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);

  // atualiza no localStorage
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  atualizarCarrinho();
}

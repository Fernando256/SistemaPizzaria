let valueToReceive = 0;
document.getElementById('body-content').onload = function () {
    if (localStorage.total == "0" || typeof localStorage.total == "undefined") {
        alert("Infelizmente o carrinho está vazio, você será redirecionado a pagina do cardápio!");
        window.location.href = "./menu-page.html";
    }
}

document.getElementById('total-value').innerHTML = `Valor Total: R$ ${localStorage.total}`;

function verifyChecked() {
    valueToReceive = parseFloat(prompt("Qual valor você irá pagar?"));
}

function confirmAction() {
    let confirm = confirm("Tem certeza que vai finalizar a compra?");
    if (confirm) {
        alert("Compra finalizada com sucesso");
        window.location.href = "./index.html";
    }
}
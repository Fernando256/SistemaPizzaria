'use strict';
let valueToReceive = 0;
document.getElementById('body-content').onload = function () {
    if (localStorage.total === '0' || typeof localStorage.total === 'undefined') {
        window.alert('Infelizmente o carrinho está vazio,' +
        'você será redirecionado a pagina do cardápio!');
        window.location.href = './menu-page.html';
    }
};

document.getElementById('total-value').innerHTML = `Valor Total: R$ ${localStorage.total}`;

function verifyChecked() {
    valueToReceive = parseFloat(window.prompt('Qual valor você irá pagar?'));
}

function confirmAction() {
    let confirm = window.confirm('Tem certeza que vai finalizar a compra?');
    if (confirm) {
        window.alert('Compra finalizada com sucesso');
        window.location.href = './index.html';
    }
}


function formIsValid() {
    let name = document.getElementById('full-name').value;
    let street = document.getElementById('street').value;
    let district = document.getElementById('district').value;
    let cep = document.getElementById('cep').value;
    let number = document.getElementById('number').value;
    let city = document.getElementById('city').value;
    alert(name);
}
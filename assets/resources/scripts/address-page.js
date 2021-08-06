'use strict';
let valueToReceive = 0;

//Verifica se o usuario não está tentando acessar
//ilegalmente a pagina sem estar com produtos no carrinho

document.getElementById('body-content').onload = function () {
    if (localStorage.total === '0' || typeof localStorage.total === 'undefined') {
        window.alert('Infelizmente o carrinho está vazio,' +
        'você será redirecionado a pagina do cardápio!');
        window.location.href = './menu-page.html';
    }
};

document.getElementById('total-value').innerHTML = `Valor Total: R$ ${localStorage.total}`;

//Verifica se o radio foi selecionado ou não
function verifyChecked() {
    let inputCashBack = document.getElementById('cash-back');
    valueToReceive = parseFloat(window.prompt('Qual valor você irá pagar?'));
    if (valueToReceive < parseFloat(localStorage.total)) {
        window.alert('O valor de troco está menor ou igual ao valor total!');
        document.getElementById('option1-radio').checked = false;
        inputCashBack.innerHTML = '';
    } else if (isNaN(parseFloat(valueToReceive))) {
        document.getElementById('option1-radio').checked = false;
        window.alert('Valor inválido!');
        inputCashBack.innerHTML = '';
    } else {
        inputCashBack.innerHTML = '<input class="input-text" id="cash-back-input"' +
        'type="text" value="T" readonly>';
        document.getElementById('cash-back-input').value =
         `Troco para R$ ${valueToReceive.toFixed(2)}`;
    }
}

//Confirmação de compra
function confirmAction() {
    let confirm = window.confirm('Tem certeza que vai finalizar a compra?');
    if (confirm) {
        window.alert('Compra finalizada com sucesso');
        window.location.href = '../wireframes/index.html';
    }
}

function sendFormValues(name, street, district, cep, number, city) {
    //let c = new Client(name, street, district, cep, number, city);
    //alert(c.name());
    //console.table(c.street());
    confirmAction();


}

(function validateHTML() {
    let name = document.getElementById('full-name');
    let street = document.getElementById('street');
    let district = document.getElementById('district');
    let cep = document.getElementById('cep');
    let number = document.getElementById('number');
    let city = document.getElementById('city');

    name.addEventListener('invalid', function () {
        if (this.validity.typeMismatch) 
            this.setCustomValidity('Preencha o nome corretamente!');
    });

    street.addEventListener('invalid', function () {
        if (this.validity.typeMismatch) 
            this.setCustomValidity('Preencha a rua corretamente!');
    });

    district.addEventListener('invalid', function () {
        if (this.validity.typeMismatch) 
            this.setCustomValidity('Preencha o bairro corretamente!');
    });

    cep.addEventListener('invalid', function () {
        if (this.validity.typeMismatch) 
            this.setCustomValidity('Preencha o cep corretamente!');
    }); 

    number.addEventListener('invalid', function () {
        if (this.validity.typeMismatch) 
            this.setCustomValidity('Preencha o numero corretamente!');
    });

    city.addEventListener('invalid', function () {
        if (this.validity.typeMismatch) 
            this.setCustomValidity('Preencha a cidade corretamente!');
    });

})();

function formIsValid() {
    let name = document.getElementById('full-name').value;
    let street = document.getElementById('street').value;
    let district = document.getElementById('district').value;
    let cep = document.getElementById('cep').value;
    let number = document.getElementById('number').value;
    let city = document.getElementById('city').value;

    if (name === null || name === '')
        return false;

    if (street === null || street === '')
        return false;

    if (district === null || district === '')
        return false;

    if (cep === null || cep === '')
        return false;
    
    
    if (number === null || number === '')
        return false;
    
    
    if (city === null || city === '')
        return false;
    
    sendFormValues(name, street, district, cep, number, city);
}

document.forms[0].onsubmit = function(e) {
    e.preventDefault();

    formIsValid();
};

import {Client} from './classes/client.js';
import {Order} from './classes/order.js';


(function () {
    'use strict';
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
    
    
    //Confirmação de compra
    function confirmAction() {
        let confirm = window.confirm('Tem certeza que vai finalizar a compra?');
        if (confirm) {
            window.alert('Compra finalizada com sucesso');
            //localStorage.cart = '[]';
            window.location.href = './orders-page.html';
            //window.location.href = '../wireframes/index.html';
        }
    }

    function orderValues() {
        let items = JSON.parse(localStorage.cart);
        let order = null;
        let allOrders = [];

        items.forEach((value) => {
            order = new Order(value.id, value.size, value.qt);
            allOrders.push(order);
        });
        return allOrders;
    }
    
    function sendFormValues(elem) {
        let orders = orderValues();
        let c = new Client(elem[0], elem[1], elem[2], elem[3], elem[4], elem[5], elem[6], orders);
        
        localStorage.teste += JSON.stringify(c);
        confirmAction();
    }

    function validityType(element, stringInput) {
        element.addEventListener('invalid', function () {
            if (this.validity.typeMismatch) 
                this.setCustomValidity(`Preencha ${stringInput} corretamente!`);
            else
                this.setCustomValidity('');
        });
    }


    //Valida os campos do formulario com a API do HTML5
    (function validateHTML() {
        let name = document.getElementById('full-name');
        let street = document.getElementById('street');
        let district = document.getElementById('district');
        let cep = document.getElementById('cep');
        let number = document.getElementById('number');
        let city = document.getElementById('city');
    
        validityType(name, 'o nome');
        validityType(street, 'a rua');
        validityType(district, 'o bairro');
        validityType(number, 'o numero');
        validityType(city, 'a cidade');

        $('#cep').mask('00000-000');
        
    
        cep.addEventListener('invalid', function () {
            if (this.validity.patternMismatch) 
                this.setCustomValidity('Preencha o cep da seguinte maneira ex: 11111-111!');
            else
                this.setCustomValidity('');
        });
    })();

    function verifyRadio() {
        let op1 = document.getElementById('option1-radio').checked;
        let op2 = document.getElementById('option2-radio').checked;

        if (op1 === true || op2 === true)
            return true;
    }
    
    function validateElement(element) {
        let item;
        for (item of element) {
            if (item === null || item === '')
                return false;
        }

        if (!verifyRadio())
            return false;
        
        return true;
    }


    //Verifica se todos os dados foram enviados corretamente do form
    function formIsValid() {
        let name = document.getElementById('full-name').value;
        let street = document.getElementById('street').value;
        let district = document.getElementById('district').value;
        let cep = document.getElementById('cep').value;
        let number = document.getElementById('number').value;
        let city = document.getElementById('city').value;
        let op1 = document.getElementById('option1-radio').checked;
        let cashBack = 0;
        
        if (op1)
            cashBack = localStorage.cashBack;

        let allElements = [name, street, district, cep, number, city, cashBack];

        if (!validateElement(allElements))
            return false;
    
        sendFormValues(allElements);
    }
    
    document.forms[0].onsubmit = function(e) {
        e.preventDefault();
    
        formIsValid();
    };

    $('button').on('click', function () {
        // O > é um seletor hierárquico estáticos onde pega o button da classe
        $('.buttons-form > button').css('background-color', '#3d3d3d');
        // O children é um seletor hierárquico dinâmico onde o button é o filho da classe
        $('.buttons-form').children('button').fadeOut();
        setTimeout(() => {
            window.location.href = './cart-page.html'; 
        }, 400);
    });

    $('#checkout').ready(function() {
        $('#checkout').addClass('checkout');
    });

    $('#cep').on('blur', function () {
        let cep = $('#cep').val();
        let service = `http://viacep.com.br/ws/${cep}/json/`;
        $.get(service, function (content) {
            $('#street').val(content.logradouro);
            $('#district').val(content.bairro);
            $('#city').val(content.localidade);
        });
    });
})();

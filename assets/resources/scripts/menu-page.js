'use strict';

import {PIZZAS} from './pizza.js';

let cart = [];

//Verificar se o localstorage ja foi criado
if (typeof localStorage.cart !== 'undefined') {
    cart = JSON.parse(localStorage.cart);
}

let modalQt = 1;//Variavel para quantidade de PIZZAS selecionadas
let modalKey = 0;//Variavel para identificação da qual pizza

document.getElementById('total-items-cart').innerHTML = cart.length;

const qs = function (element) {
    return document.querySelector(element);
};

PIZZAS.map((pizza, index) => {
    //Clona a div models e pizza-item para dentro da variavel pizzaItem
    let pizzaItem = qs('.models .pizza-item').cloneNode(true);

    //Insere uma chave de identificação no atributo
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item-img img').src = pizza.img;
    pizzaItem.querySelector('.pizza-item-name').innerHTML = pizza.name;
    pizzaItem.querySelector('.pizza-item-desc').innerHTML = pizza.description;

    //toFixed são os algarismos após virgula
    pizzaItem.querySelector('.pizza-item-price').innerHTML = `R$ ${pizza.price.toFixed(2)}`;

    //append adiciona um elemento após o ultimo
    document.getElementById('pizza-area').append(pizzaItem);

    pizzaItem.querySelector('a').addEventListener('click', function (element) {
        //Não faz a ação padrão do elemento
        element.preventDefault();

        //Pega qual pizza foi clicaca.
        //O objeto mais proximo de pizza-item vai ser pego o atributo data-key
        let key = element.target.closest('.pizza-item').getAttribute('data-key');

        modalKey = key;

        modalQt = 1; //Valor padrão para inicial o modal da pizza

        qs('.pizzaBig img').src = PIZZAS[key].img;
        document.getElementsByTagName('h1')[0].innerHTML = PIZZAS[key].name;
        qs('.pizzaInfo-desc').innerHTML = PIZZAS[key].description;
        qs('.pizzaInfo-actualPrice').innerHTML = `R$ ${PIZZAS[key].price.toFixed(2)}`;

        qs('.pizzaInfo-size.selected').classList.remove('selected');

        //Seleciona o tamanho
        document.querySelectorAll('.pizzaInfo-size').forEach((size, sizeIndex) => {
            if (sizeIndex === 2) 
                size.classList.add('selected');
            
            size.querySelector('span').innerHTML = PIZZAS[key].sizes[sizeIndex];
        });

        //Quantidade de PIZZAS selecionadas no modal
        qs('.pizzaInfo-qt').innerHTML = modalQt;

        //Efeito CSS
        qs('.pizzaWindowArea').style.opacity = 0;
        qs('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            qs('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });
});

//Eventos do modal das PIZZAS

function closeModal() {
    qs('.pizzaWindowArea').style.opacity = 0;
    let i = 0;
    let timer = setInterval(() => {
        if (i > 0)
            clearInterval(timer);

        qs('.pizzaWindowArea').style.display = 'none';
        i++;
    }, 500);
}

//Fazendo array com botoes de voltar no modal
let backMobile = document.getElementsByName('pizzaInfo-cancelMobileButton');
let backDesktop = document.getElementsByName('pizzaInfo-cancelButton');

let buttonBack = [].concat(backMobile[0], backDesktop[0]);

//Evento de click no botao voltar
buttonBack.forEach((item) => {
    item.addEventListener('click', closeModal);
});

//Controla Botão de - no modal
qs('.pizzaInfo-qt-lower').addEventListener('click', () =>{
    if (modalQt > 1) {
        modalQt--;
        qs('.pizzaInfo-qt').innerHTML = modalQt;
    }
});

//Controla Botão de + no modal
qs('.pizzaInfo-qt-add').addEventListener('click', () =>{
    modalQt++;
    qs('.pizzaInfo-qt').innerHTML = modalQt;
});

//Remover e adicionar a posição do selected no botao
document.querySelectorAll('.pizzaInfo-size').forEach((element) => {
    element.addEventListener('click', () => {
        qs('.pizzaInfo-size.selected').classList.remove('selected');
        element.classList.add('selected');
    });
});

//Adicionar ao carrinho
qs('.pizzaInfo-addButton').addEventListener('click', () => {
    let sizePizza= parseInt(qs('.pizzaInfo-size.selected').getAttribute('data-key'));
    
    let identifier = PIZZAS[modalKey].id+'@'+sizePizza;

    //Caso não existir PIZZAS do mesmo tamanho vai retornar -1
    let key = cart.findIndex((item) => {
        return item.identifier === identifier;
    });

    if (key > -1) {
        cart[key].qt += modalQt;
    }else {
        cart.push({
            identifier,
            id: PIZZAS[modalKey].id,
            size: sizePizza,
            qt: modalQt
        });
    }
    document.getElementById('total-items-cart').innerHTML = cart.length;
    localStorage.cart = JSON.stringify(cart);
    closeModal();
});

//verifica se carrinho ta vazio e manda alert
document.getElementById('cart-site').addEventListener('click', (e) =>{
    if (cart.length === 0) {
        e.preventDefault();
        window.alert('Carrinho de compras está vazio!');
    }
});

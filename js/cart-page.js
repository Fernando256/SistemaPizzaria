'use strict';
let cart = JSON.parse(localStorage.cart);
let total = 0;
let priceItem = 0;

//Colocar numero de itens carrinho
document.getElementById('total-items-cart').innerHTML = cart.length;

(function updateCart() {
    document.getElementById('pizza-area').innerHTML = '';
    for (let i in cart) {

        //retorna o item da pizza selecionada
        let pizzaItem = pizzas.find((pizza) => {
            return pizza.id == cart[i].id;
        });

        let cartItem = document.querySelector('.models .item-cart').cloneNode(true);

        let pizzaSizeName = getSize(cart[i].size);
        let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
        cartItem.querySelector('.pizza-items img').src = pizzaItem.img;
        cartItem.querySelector('.text-block span').innerHTML = pizzaName;
        cartItem.querySelector('.pizzaInfo-qt').innerHTML = cart[i].qt;
        cartItem.querySelector('.text-block a').addEventListener('click', () => {
            cart.splice(i, 1);
            updatePage();
        });

        cartItem.querySelector('.pizzaInfo-qt-lower').addEventListener('click', () => {
            if (cart[i].qt > 1) {
                cart[i].qt--;
                updatePage()
            }
        });

        cartItem.querySelector('.pizzaInfo-qt-add').addEventListener('click', () => {
            cart[i].qt++;
            updatePage();
        });
        priceItem = cart[i].qt * pizzas[i].price;
        cartItem.querySelector('.pizzaInfo-price p').innerHTML = `R$ ${priceItem.toFixed(2)}`;
        total += priceItem;
        priceItem = 0;

        document.getElementById('pizza-area').append(cartItem);
    };

    function updatePage() {
        localStorage.cart = JSON.stringify(cart);
        total = 0;
        document.getElementById('total-items-cart').innerHTML = cart.length;
        updateCart();
        verifyCart();
    }
    (function updateTotal() {
        document.querySelector('.total-value p').innerHTML = `Total: R$ ${total.toFixed(2)}`;
        localStorage.total = total;
    }());
}());

function verifyCart() {
    if (cart.length == 0) {
        alert("Infelizmente o carrinho está vazio, você será redirecionado a pagina do cardápio!");
        window.location.href = "./menu-page.html";
    }  
}

function getSize(size) {
    switch(size) {
        case 0:
            return 'P';
        case 1: 
            return 'M';
        case 2:
            return 'G';
    }
}

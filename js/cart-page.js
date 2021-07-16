let cart = JSON.parse(localStorage.cart);

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

        cartItem.querySelector('.pizzaInfo-price p').innerHTML = `R$ ${(cart[i].qt * pizzas[i].price).toFixed(2)}`;

        document.getElementById('pizza-area').append(cartItem);

    };

    function updatePage() {
        localStorage.cart = JSON.stringify(cart);
        updateCart();
    }
}());

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

let modalQt = 1;

const qs = function (element) {
    return document.querySelector(element);
}

pizzas.map((pizza, index) => {
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

    pizzaItem.querySelector('a').addEventListener('click', function preventAction(element) {
        //Não faz a ação padrão do elemento
        element.preventDefault();

        //Pega qual pizza foi clicaca. O objeto mais proximo de pizza-item vai ser pego o atributo data-key
        let key = element.target.closest('.pizza-item').getAttribute('data-key');

        modalQt = 1; //Valor padrão para inicial o modal da pizza

        qs('.pizzaBig img').src = pizzas[key].img;
        document.getElementsByTagName('h1')[0].innerHTML = pizzas[key].name;
        qs('.pizzaInfo-desc').innerHTML = pizzas[key].description;
        qs('.pizzaInfo-actualPrice').innerHTML = `R$ ${pizzas[key].price.toFixed(2)}`;

        qs('.pizzaInfo-size.selected').classList.remove('selected');

        document.querySelectorAll('.pizzaInfo-size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2)
                size.classList.add('selected');

            size.querySelector('span').innerHTML = pizza[key].sizes[sizeIndex];
        });

        //Quantidade de pizzas selecionadas no modal
        qs('.pizzaInfo-qt').innerHTML = modalQt;

        //Efeito CSS
        qs('.pizzaWindowArea').style.opacity = 0;
        qs('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            qs('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    })
});
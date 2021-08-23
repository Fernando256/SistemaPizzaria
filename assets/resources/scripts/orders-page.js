import {pizzas} from './pizza.js';

(function() {
    'use strict';

    let clientOrders = document.getElementById('orders');
    let allOrders = JSON.parse(localStorage.clientValues);
    

    function getPizza(order) {
        order.forEach(e => {
            clientOrders.innerHTML += `
            <ul>
                <li>${pizzas[e.idPizza].name}</li>
                <ul>
                    <li>Tamanho: ${pizzas[e.idPizza].sizes[e.size]}</li>
                    <li>Quantidade: ${e.qt}</li>
                </ul>
            </ul>
            `;
        });
    }
    
    allOrders.forEach((element, index) => {
        clientOrders.innerHTML += 
        `<h3>Cliente</h3>
        <ul>
            <li>Nome: ${element.name}</li>
            <li>Rua: ${element.address}</li>
            <li>Bairro: ${element.district}</li>
            <li>Numero: ${element.number}</li>
            <li>CEP: ${element.zipCode}</li>
            <li>Cidade: ${element.city}</li>
            <li>Total: ${element.total}</li>
            <li>Levar de troco: 
                ${element.cashBack > 0 ? (element.cashBack-element.total).toFixed(2) : 'Sem Troco'}
            </li>
        </ul>   
        `;
        clientOrders.innerHTML += '<h3>Pedidos</h3>';
        getPizza(element.order);
        clientOrders.innerHTML += `<button id=${index}>`+
         `Remover pedido</button>`;
        clientOrders.innerHTML += '<hr/>';
    });

    //Ver qual botao foi selecionado e deleta-lo
    (function (){
        let button = document.querySelectorAll('#orders button');
        for (var i = 0; i < button.length; i++) {
            button[i].addEventListener('click', (e) =>{
                allOrders = JSON.parse(localStorage.clientValues);
                allOrders.splice(e.target.id, 1);
                localStorage.clientValues = JSON.stringify(allOrders);
                document.location.reload();
            });
        }
    })();
})();

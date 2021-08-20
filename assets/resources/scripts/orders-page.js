'use strict';
let clientOrders = document.getElementById('orders');
let allOrders = [JSON.parse(localStorage.teste)];

console.log(allOrders);

allOrders.forEach(element => {
    clientOrders.innerHTML = 
    `<ol>
        <li>Nome: ${element.name}</li>
        <li>Rua: ${element.address}</li>
        <li>Bairro: ${element.district}</li>
        <li>Numero: ${element.number}</li>
        <li>Nome: ${element.name}</li>
        <li>CEP: ${element.zipCode}</li>
        <li>Cidade: ${element.city}</li>
        <li>Troco: ${element.cashBack}</li>
    </ol>
    <hr/>
`;
});
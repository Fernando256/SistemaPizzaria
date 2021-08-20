'use strict';
let valueToReceive = 0;
let inputCashBack = document.getElementById('cash-back');

 //Verifica se o radio foi selecionado ou não
 function verifyChecked() {
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
         'type="text" valuey="T" readonly>';
        document.getElementById('cash-back-input').value =
         `Troco para R$ ${valueToReceive.toFixed(2)}`;

        localStorage.cashBack = `${valueToReceive.toFixed(2)}`;
    }
}

$(document).ready(function(){
    $('#option2-radio').click(function () {
        if (this.checked) {
            $('#cash-back-input').val('');
            $('.cash-back').html('');
        }
    });
});
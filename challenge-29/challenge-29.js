(function(DOM) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  function app() {
    return {
      init: function init() {
        console.log('APP / INIT');
        this.companyInfo();
        this.initEvents();
      },
      initEvents: function initEvents() {
        DOM('[data-js="form-register"]').on('submit', this.handleSubmit);
      },
      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        var $tableCar = DOM('[data-js="table-car"]').get();
        $tableCar.appendChild(app().createNewCar());
      },
      createNewCar: function createNewCar() {
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement('tr');
        var $tdImagem = document.createElement('td');
        var $imagem = document.createElement('img');
        var $tdBrand = document.createElement('td');
        var $tdYear = document.createElement('td');
        var $tdPlate = document.createElement('td');
        var $tdColor = document.createElement('td');

        $imagem.setAttribute('src', DOM('[data-js="image"]').get().value);
        $tdImagem.appendChild($imagem);

        $tdBrand.textContent = DOM('[data-js="brand-model"]').get().value;
        $tdYear.textContent = DOM('[data-js="year"]').get().value;
        $tdPlate.textContent = DOM('[data-js="plate"]').get().value;
        $tdColor.textContent = DOM('[data-js="color"]').get().value;

        $tr.appendChild($tdImagem);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);

        return $fragment.appendChild($tr);
      },
      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', '/company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false)
      },
      getCompanyInfo: function getCompanyInfo() {
        if(!app().isReady.call(this)) {
          return;
        }
        var data = JSON.parse(this.responseText);
        var $companyName = DOM('[data-js="company-name"]').get();
        var $companyPhone = DOM('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;

      },
      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      }
    }
  }

  app().init();

})(window.DOM);

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("projetonetflixx.controller.Inicio", {
        onInit: function () {

            //Nomeclatura 
            let sNome = 'Cristiano';//String sempre que é texto S na frente
            let aLista = [];//array lista de clientes, por exemplo
            let oUser = {};//quando tem objeto
            
            //definição de lista vazia de resultados
            let resultados = {
                titles: []
            }
            

            //definição de modelo - variável especial para mostrar dados na tela
            let resultadosModel = new JSONModel ();
            //atribuição de dados
            resultadosModel.setData(resultados);
            //anexar modelo na tela
            let tela = this.getView();
            tela.setModel(resultadosModel, "APINetflix");


        },
        onInicioLinkPress: function(){
            alert ("navegar para tela incial");
        },
        onBuscarDados: function(){
            //busca de dados na API da Netflix
            let searchField = this.byId ("idSearchField");
            let filtro = searchField.getValue();

            alert (filtro);

            const settings = {
                async: true,
                crossDomain: true,
                url: 'https://netflix54.p.rapidapi.com/search/?query='
                + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '4a6d48f083mshccace93d438b616p1a476bjsn16512e794148',
                    'x-rapidapi-host': 'netflix54.p.rapidapi.com'
                }
            };
            
            $.ajax(settings).done(function (response) {
                console.log(response);
                //resgatar o modelo e atualizar os dados

                let tela = this.getView();
                let modelo = tela.getModel ("APINetflix");
                let dados = modelo.getData();

                //limpar a lista
                dados.titles = [];
                dados.titles = response.titles;
                modelo.refresh ();
            }.bind(this));


        }
    });
});

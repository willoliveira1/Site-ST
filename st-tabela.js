//Botão de calcular
var botao = document.getElementById("botao");

botao.addEventListener("click", function(event){
	event.preventDefault();
	var form = document.querySelector("#entradas");
	var parametros = obtemParametros(form);
	difalDiretoNacional(parametros, somaNacional(), aliquotaIcms());
	difalDiretoImportado(parametros, somaImportado());
});

//Obtem os valores dos parâmetros para o cálculo
function obtemParametros(form){
	var parametros = {
		tipo: form.tipo.value,
		estado: form.estado.value,
		aliquotaInterna: form['aliquota-interna'].value / 100
	}
	return parametros;
}

//Faz a soma dos inputs da coluna nacional
function somaNacional(){
	var somaNacional = 0;

	for(var i = 0; i < nacional.length; i++){
		somaNacional += Number(nacional[i].value);
	}
	return somaNacional;
}

//Faz a soma dos inputs da coluna importado
function somaImportado(){
	var somaImportado = 0;

	for(var i = 0; i < importado.length; i++){
		somaImportado += Number(importado[i].value);
	}
	return somaImportado;
}

//Procura nos arrays qual a aliquota do ICMS do estado selecionado
function aliquotaIcms(){
	//Estados com 12%
	for(var i = 0; i < doze.length; i++){
		if(estado.value == doze[i]){
			return 0.12;
		}
	}
	//Estados com 7%
	for(var i = 0; i < sete.length; i++){
		if(estado.value == sete[i]){
			return 0.07;
		}
	}
}

//Determina qual tipo deve ser utilizado (0 é contribuinte || 1 é não contribuinte)
//Falta colocar as funções no lugar dos consoles
function tipoCalculo(){
	if(tipo.value == 0){
		for(var i = 0; i < cDireto.length; i++){
			if(estado.value == cDireto[i]){
				console.log('direto');
			}
		}
		for(var i = 0; i < cPorDentro.length; i++){
			if(estado.value == cPorDentro[i]){
				console.log('Por Dentro');
			}
		}
	} else if(tipo.value == 1){
		console.log('ñ');
	}
}

//Função que cálcula o Difal de produtos Nacionais para Contribuinte Direto e Não Contribuinte
function difalDiretoNacional(parametros, somaNacional, icms){
	var calc = somaNacional * (parametros.aliquotaInterna - icms);
	return calc;
}

//Função que cálcula o Difal de produtos Importados para Contribuinte Direto e Não Contribuinte
function difalDiretoImportado(parametros, somaImportado){
	var calc = somaImportado * (parametros.aliquotaInterna - 0.04);
	return calc;
}

//Arrays por estado de Aliquotas ICMS e Tipo.
var doze = [11, 18, 19, 23, 24];
var sete = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 20, 21, 22, 25, 26];
var cDireto = [3, 4, 6, 7, 8, 10, 12, 13, 15, 17, 19, 20, 22];
var cPorDentro = [1, 2, 5, 9, 11, 14, 16, 18, 21, 23, 24, 25, 26];

//Entrada de parametros
var tipo = document.getElementById("tipo");
var estado = document.getElementById("estado");
var aliquotaInterna = document.getElementById("aliquota-interna");

//Entrada de valores
var nacional = document.querySelectorAll(".soma-nacional");
var importado = document.querySelectorAll(".soma-importado");

//Resultados
var resultadoTotal = document.getElementById("resultado-total");
var resultadoDifal = document.getElementById("resultado-difal");

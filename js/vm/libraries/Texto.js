import { T_parO, T_word, T_inteiro, T_cadeia, T_caracter, T_real, T_logico, T_vazio, T_Minteiro } from "../../compiler/tokenizer.js";

function replaceSubstring(inSource, inToReplace, inReplaceWith) {
	let outString = [];
	let repLen = inToReplace.length;
	let idx = inSource.indexOf(inToReplace);
	while (idx !== -1) {
		outString.push(inSource.substring(0, idx));
		outString.push(inReplaceWith);

		inSource = inSource.substring(idx + repLen);
		idx = inSource.indexOf(inToReplace);
	}
	outString.push(inSource);
	return outString.join("");
}
	
export default class Texto {
	constructor() {
		this.members = {
		"caixa_alta":{id:T_parO,parameters:[{name:"cad",type:T_cadeia}],type:T_cadeia,jsSafe:true},
		"caixa_baixa":{id:T_parO,parameters:[{name:"cad",type:T_cadeia}],type:T_cadeia,jsSafe:true},
		"extrair_subtexto":{id:T_parO,parameters:[{name:"cad",type:T_cadeia},{name:"posicao_inicial",type:T_inteiro},{name:"posicao_final",type:T_inteiro}],type:T_cadeia,jsSafe:true},
		"numero_caracteres":{id:T_parO,parameters:[{name:"cad",type:T_cadeia}],type:T_inteiro,jsSafe:true},
		"obter_caracter":{id:T_parO,parameters:[{name:"cad",type:T_cadeia},{name:"indice",type:T_inteiro}],type:T_caracter,jsSafe:true},
		"posicao_texto":{id:T_parO,parameters:[{name:"agulha",type:T_cadeia},{name:"palheiro",type:T_cadeia},{name:"posicao_inicial",type:T_inteiro}],type:T_inteiro,jsSafe:true},
		"preencher_a_esquerda":{id:T_parO,parameters:[{name:"letra",type:T_caracter},{name:"tamanho",type:T_inteiro},{name:"cad",type:T_cadeia}],type:T_cadeia,jsSafe:true},
		"substituir":{id:T_parO,parameters:[{name:"cad",type:T_cadeia},{name:"texto_pesquisa",type:T_cadeia},{name:"texto_substituto",type:T_cadeia}],type:T_cadeia,jsSafe:true}
		};
	}
	
	resetar()
	{
	}
	
	caixa_alta(cad)
	{
		return {value:cad.toUpperCase()};
	}
	
	caixa_baixa(cad)
	{
		return {value:cad.toLowerCase()};
	}
	
	extrair_subtexto(cad,posicao_inicial,posicao_final)
	{
		return {value:cad.substring(posicao_inicial,posicao_final)};
	}
	
	numero_caracteres(cad)
	{
		return {value:cad.length};
	}
	
	obter_caracter(cad,indice)
	{
		return {value:cad.charAt(indice)};
	}
	
	posicao_texto(texto,cad,posicao_inicial)
	{
		return {value:cad.indexOf(texto,posicao_inicial)};
	}
	
	preencher_a_esquerda(car,tamanho,cad)
	{
		return {value:cad.padStart(tamanho,car)};
	}
	

	
	substituir(cad,texto_pesquisa,texto_substituto)
	{
		//return {value:cad.replace(texto_pesquisa, texto_substituto)};
		let ret = replaceSubstring(cad, texto_pesquisa, texto_substituto);
		return {value:ret};
	}
}

programa
{
	inclua biblioteca Texto --> t
	funcao inicio ()
	{
		cadeia txt = "Lorem ipsum dolor sit amet"
		escreva(t.caixa_alta(txt),"\n")
		escreva(t.caixa_baixa(txt),"\n")
		escreva(t.extrair_subtexto(txt,6,11),"\n")
		escreva(t.numero_caracteres(txt),"\n")
		escreva(t.obter_caracter(txt,10),"\n")
		escreva(t.posicao_texto("a",txt,0),"\n")
		escreva(t.preencher_a_esquerda('*',32,txt),"\n")
		escreva(t.substituir(txt,"m","?"),"\n")
		
		para(inteiro i=0;i<t.numero_caracteres(txt);i++) {
			escreva(t.obter_caracter(txt,i))
		}

		cadeia texto = "PAREDES"
		cadeia sub_texto

		
		sub_texto = t.extrair_subtexto(texto, 0, 7)
		escreva(sub_texto, "\n")

		escreva(t.obter_caracter(texto, 0))
		escreva(t.obter_caracter(texto, 6))

		escreva(t.posicao_texto("RE", texto, -300))
	}
}
/*---
LOREM IPSUM DOLOR SIT AMET
lorem ipsum dolor sit amet
ipsum
26
m
22
******Lorem ipsum dolor sit amet
Lore? ipsu? dolor sit a?et
Lorem ipsum dolor sit ametPAREDES
PS2
---*/
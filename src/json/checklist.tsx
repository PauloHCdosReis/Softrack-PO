import { ReactElement } from "react";

export interface ChecklistData {
  checklists: ChecklistItem[];
}

export interface ChecklistItem {
  checklist: 'off' | 'on';
  tempoMinimo: number;
  tempoMaximo: number;
  perguntas: Pergunta[];
}

export interface Pergunta {
  idPergunta: number;
  pergunta: string;
	resposta?: boolean | null;
  descricao: string | null;
  critica: boolean;
  ordem: number;
  filhas: Pergunta[];
	fim?: {
		btn: string;
		messages: {
			id: number,
			message: string;
			icon?: ReactElement;
		}[];
		autoSendTime: number
		autoSendMessage: string
		statusChecklist: number
	}
}

export const Checklist: ChecklistData = {
	"checklists": [
		{
			"checklist": "off",
			"tempoMinimo": 10,
			"tempoMaximo": 180,
			"perguntas": [
				{
					"idPergunta": 2,
					"pergunta": "Bateria sem fio exposto?",
					"descricao": "Verifique se a bateria não possui fios expostos ou danificados que possam causar curtos-circuitos ou riscos elétricos.",
					"critica": false,
					"ordem": 2,
					"filhas": []
				},
				{
					"idPergunta": 1,
					"pergunta": "Botão de emergência está funcionando?",
					"descricao": "O botão de emergência é um componente crítico em uma empilhadeira, projetado para interromper imediatamente todas as operações em caso de emergência. Ele é essencial para garantir a segurança do operador, dos pedestres e do ambiente de trabalho. Ao ser acionado, o botão de emergência deve interromper todas as funções da empilhadeira, incluindo movimento, elevação e qualquer outra operação ativa. A funcionalidade adequada deste botão é vital para responder rapidamente a situações de risco, minimizando assim o potencial de danos pessoais ou materiais. Portanto, durante a inspeção da empilhadeira, é fundamental verificar se o botão de emergência está posicionado corretamente, acessível ao operador e, o mais importante, se está funcionando conforme o esperado. Qualquer sinal de mau funcionamento ou desgaste deve ser tratado imediatamente para garantir um ambiente de trabalho seguro e eficiente.",
					"critica": true,
					"ordem": 1,
					"filhas": []
				},
				{
					"idPergunta": 4,
					"pergunta": "Avisos de advertência e capacidade existe?",
					"descricao": "Certifique-se de que os avisos de advertência e capacidade estejam visíveis e legíveis, fornecendo informações importantes sobre o uso e as capacidades operacionais da empilhadeira.",
					"critica": false,
					"ordem": 4,
					"filhas": []
				},
				{
					"idPergunta": 5,
					"pergunta": "Pneus e rodas sem rachaduras e desgaste excessivo?",
					"descricao": "Examine os pneus e rodas para garantir que não haja rachaduras, cortes ou desgaste excessivo que possam comprometer a segurança ou a capacidade de manobra da empilhadeira.",
					"critica": true,
					"ordem": 5,
					"filhas": [
						{
							"idPergunta": 51,
							"pergunta": "Dianteira Esquerda",
							"descricao": "",
							"critica": true,
							"ordem": 1,
							"filhas": []
						},
						{
							"idPergunta": 52,
							"pergunta": "Dianteira Direita",
							"descricao": "",
							"critica": true,
							"ordem": 2,
							"filhas": []
						},
						{
							"idPergunta": 53,
							"pergunta": "Traseira Esquerda",
							"descricao": "",
							"critica": true,
							"ordem": 3,
							"filhas": []
						},
						{
							"idPergunta": 54,
							"pergunta": "Traseira Direita",
							"descricao": "",
							"critica": true,
							"ordem": 4,
							"filhas": []
						}
					]
				},
				{
					"idPergunta": 6,
					"pergunta": "Equipamento está limpo?",
					"descricao": "Verifique se a empilhadeira está limpa e livre de sujeira, detritos ou qualquer outra obstrução que possa interferir em seu funcionamento seguro e eficiente.",
					"critica": false,
					"ordem": 6,
					"filhas": []
				}
			]
		},
		{
			"checklist": "on",
			"tempoMinimo": 10,
			"tempoMaximo": 180,
			"perguntas": [
				{
					"idPergunta": 7,
					"pergunta": "Buzina está funcionando?",
					"descricao": "Verifique se a buzina está funcionando corretamente, pois ela é crucial para a segurança, alertando outras pessoas sobre a presença da empilhadeira e possíveis perigos iminentes.",
					"critica": false,
					"ordem": 8,
					"filhas": []
				},
				{
					"idPergunta": 9,
					"pergunta": "Grade da carga sem danos?",
					"descricao": "Examine a grade da carga para garantir que não haja danos que possam comprometer a integridade estrutural ou a capacidade de transporte da empilhadeira.",
					"critica": false,
					"ordem": 10,
					"filhas": []
				},
				{
					"idPergunta": 11,
					"pergunta": "Sistema de elevação está funcionando?",
					"descricao": "Verifique se o sistema de elevação da empilhadeira está funcionando corretamente, pois é essencial para realizar operações de elevação e movimentação de carga de forma segura e eficiente.",
					"critica": false,
					"ordem": 12,
					"filhas": []
				},
				{
					"idPergunta": 12,
					"pergunta": "Sem vazamento de óleo no piso?",
					"descricao": "Certifique-se de que não haja vazamentos de óleo no piso ao redor da empilhadeira, pois isso pode indicar problemas mecânicos ou de vedação que requerem atenção imediata.",
					"critica": false,
					"ordem": 15,
					"filhas": []
				},
				{
					"idPergunta": 13,
					"pergunta": "Freios estão funcionando?",
					"descricao": "Verifique se os freios da empilhadeira estão funcionando corretamente, pois são fundamentais para controlar a velocidade e parar a empilhadeira de forma segura.",
					"critica": true,
					"ordem": 16,
					"filhas": []
				},
				{
					"idPergunta": 20,
					"pergunta": "Equipamento funciona sem barulho estranho?",
					"descricao": "Certifique-se de que a empilhadeira está operando silenciosamente, sem ruídos incomuns que possam indicar problemas mecânicos ou operacionais.",
					"critica": false,
					"ordem": 25,
					"filhas": []
				},
				{
					"idPergunta": 15,
					"pergunta": "Giroflex está funcionando?",
					"descricao": "Verifique se o giroflex está funcionando corretamente, pois é essencial para sinalizar a presença da empilhadeira em áreas de tráfego e operações.",
					"critica": false,
					"ordem": 18,
					"filhas": []
				},
			]
		}
	]
}
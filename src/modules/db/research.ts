import { DocumentData } from "./model";

export const initialStateArr: DocumentData[] = [
	{
		name: "0_Krokodile.pdf",
		totalPages: 15,
		currentPage: 1,
		riverMakeUps: {},
		cards: {},
		lastCardIDNumber: 0,
	},
	{
		name: "1_Fakten.pdf",
		totalPages: 1,
		currentPage: 1,
		riverMakeUps: {},
		cards: {},
		lastCardIDNumber: 0,
	},
	{
		name: "Atom.pdf",
		totalPages: 1,
		currentPage: 1,
		riverMakeUps: { "CardRiver 1": { riverID: "CardRiver 1", cardIDs: ["1"] } },
		cards: {
			"1": {
				type: "Q-A",
				content: {
					q: "Was ist DNS?",
					a:
						"DNS ist eine Nukleinsäure, die sich aus einer Kette von vielen Nukleotiden zusammensetzt.\n\nAls Nukleotide werden unter anderem die Bausteine von Nukleinsäuren wie der DNS bezeichnet. Ein Nukleotid setzt sich aus einem Basen-, einem Zucker- und einem Phosphatanteil zusammen.\n\nNukleinsäuren sind aus einzelnen Bausteinen, den Nukleotiden, aufgebaute Makromoleküle, die bei allen Organismen die genetische Information enthalten.",
				},
				cardID: "1",
			},
		},
		lastCardIDNumber: 2,
	},
	{
		name: "3_Platon.pdf",
		totalPages: 45,
		currentPage: 3,
		riverMakeUps: {
			"CardRiver 3": { riverID: "CardRiver 3", cardIDs: ["1", "3"] },
			"CardRiver 4": { riverID: "CardRiver 4", cardIDs: ["5", "7"] },
			"CardRiver 7": { riverID: "CardRiver 7", cardIDs: ["9", "11"] },
			"CardRiver 9": { riverID: "CardRiver 9", cardIDs: ["13", "15"] },
			"CardRiver 10": { riverID: "CardRiver 10", cardIDs: ["17", "19"] },
		},
		cards: {
			"1": {
				type: "Q-A",
				content: {
					q: "Worauf stützte Ariston seinen Glauben, dass er der Nachkomme eines mythischen Königs von Athen war?",
					a: "Sein Vorfahre Aristokles hatte bereits das höchste Staatsamt bekleidet.",
				},
				origin: {
					q: { spanIndexStart: 9, spanIndexEnd: 10, page: 3 },
					a: { spanIndexStart: 19, spanIndexEnd: 19, page: 3 },
				},
				cardID: "1",
			},
			"3": { type: "Note", content: "Wer ist Ariston?", cardID: "3" },
			"5": {
				type: "Q-A",
				content: {
					q: "Was erhoffte sich Platon von Archytas?",
					a: "Von  Archytas  erhoffte  er  sich  vor  allem mathematische Erkenntnisse.",
				},
				origin: {
					q: { spanIndexStart: 47, spanIndexEnd: 47, page: 4 },
					a: { spanIndexStart: 50, spanIndexEnd: 51, page: 4 },
				},
				cardID: "5",
			},
			"7": { type: "Note", content: "Wer ist Archytas?", cardID: "7" },
			"9": {
				type: "Q-A",
				content: {
					q: "Warum ist eine absolute Datierung der Werke Platons schwierig?",
					a:
						"Sie enthalten kaum Hinweise auf historische Ereignisse ihrer Abfassungszeit und die Handlung der Dialoge ist in der Regel in die Lebenszeit des Sokrates gesetzt, also vor dem Beginn von Platons schriftstellerischer Tätigkeit.",
				},
				origin: {
					q: { spanIndexStart: 61, spanIndexEnd: 61, page: 7 },
					a: { spanIndexStart: 61, spanIndexEnd: 64, page: 7 },
				},
				cardID: "9",
			},
			"11": {
				type: "Note",
				content:
					"Dank was kann in manchen Fällen zumindest der Zeitraum der Entstehung von Platons Werken eingegrenzt werden?",
				cardID: "11",
			},
			"13": {
				type: "Q-A",
				content: {
					q: "Wer steht am meisten im Zentrum von Platons Dialogen?",
					a:
						"Der aus Platons Perspektive gezeichnete Sokrates, in dessen Gestalt sich historische und idealisierte Züge mischen.",
				},
				origin: {
					q: { spanIndexStart: 25, spanIndexEnd: 25, page: 9 },
					a: { spanIndexStart: 24, spanIndexEnd: 24, page: 9 },
				},
				cardID: "13",
			},
			"15": {
				type: "Note",
				content: "Was ist die Folge davon, dass Platon seine Dialoge meist aus der Perspektive von Sokrates schrieb?",
				cardID: "15",
			},
			"17": {
				type: "Q-A",
				content: {
					q: "Was ist die Grundmethode, die Sokrates in Platons Dialogen anwendet?",
					a:
						"Die Widerlegung der ursprünglichen Ansichten seiner Gesprächspartner, die sich als naiv und unreflektiert erweisen.",
				},
				origin: {
					q: { spanIndexStart: 38, spanIndexEnd: 38, page: 10 },
					a: { spanIndexStart: 38, spanIndexEnd: 44, page: 10 },
				},
				cardID: "17",
			},
			"19": {
				type: "Note",
				content: "Was tritt durch die Befreiung von Scheinwissen durch Sokrates Widerlegungsmethode zutage?",
				cardID: "19",
			},
		},
		lastCardIDNumber: 20,
	},
	{
		name: "4_Nervenzelle.pdf",
		totalPages: 12,
		currentPage: 4,
		riverMakeUps: {
			"CardRiver 1": { riverID: "CardRiver 1", cardIDs: ["1", "3"] },
			"CardRiver 2": { riverID: "CardRiver 2", cardIDs: ["5", "7"] },
			"CardRiver 3": { riverID: "CardRiver 3", cardIDs: ["9", "11"] },
			"CardRiver 4": { riverID: "CardRiver 4", cardIDs: ["13", "15"] },
		},
		cards: {
			"1": { type: "Q-A", content: { q: "Worauf ist eine Nervenzelle spezialisiert? (Seite 1)", a: "" }, cardID: "1" },
			"3": {
				type: "Q-A",
				content: { q: "Wie viele Nervenzellen hat das Gehirn Schätzungen zufolge? (Seite 1)", a: "" },
				cardID: "3",
			},
			"5": {
				type: "Q-A",
				content: { q: "Wie wird der Körper der Nervenzelle bezeichnet? (Seite 2)", a: "" },
				cardID: "5",
			},
			"7": { type: "Q-A", content: { q: "", a: "" }, cardID: "7" },
			"9": {
				type: "Q-A",
				content: { q: "Wovon hängt es ab ob ein Aktionspotential gebildet wird oder nicht? (Seite 3)", a: "" },
				cardID: "9",
			},
			"11": { type: "Q-A", content: { q: "Was sind Dendriten? (Seite 3)", a: "" }, cardID: "11" },
			"13": {
				type: "Q-A",
				content: {
					q:
						"Wie wird im Falle einer Erregung der Nervenzelle sichergestellt, dass Aktionspotentiale am Axonhügel entstehen und über deren Axon weitergeleitet werden? (Seite 4)",
					a: "",
				},
				cardID: "13",
			},
			"15": { type: "Q-A", content: { q: "Was ist das Axon einer Nervenzelle? (Seite 4)", a: "" }, cardID: "15" },
		},
		lastCardIDNumber: 16,
	},
];

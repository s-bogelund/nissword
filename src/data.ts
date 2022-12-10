import { CluesInputOriginal } from '@jaredreisinger/react-crossword/dist/types';
import { CrosswordType } from './types';

export const data1: CluesInputOriginal = {
	across: {
		1: {
			clue: 'one plus one',
			answer: 'TWO',
			row: 0,
			col: 0,
		},
		3: {
			clue: 'two plus two',
			answer: 'error',
			row: 2,
			col: 2,
		},
	},
	down: {
		2: {
			clue: 'three minus two',
			answer: 'ONE',
			row: 0,
			col: 2,
		},
		4: {
			clue: 'three minus two',
			answer: 'ONE',
			row: 2,
			col: 5,
		},
		5: {
			clue: 'Guess a few more to get this hint',
			answer: 'ONE',
			row: 4,
			col: 3,
		},
	},
};

export const data2: CrosswordType = {
	currentTimer: 600,
	initialTimer: 600,
	completed: false,
	crossword: {
		across: {
			3: {
				clue: 'Hvad laver du egentlig?',
				answer: 'DEVOPS',
				row: 5,
				col: 7,
				completed: false,
			},
			7: {
				clue: 'Hvad kan og vil en svane brække?',
				answer: 'ARM',
				row: 7,
				col: 12,
				completed: false,
			},
			8: {
				clue: 'Dødbringende ikke-rigtig-nød',
				answer: 'PEANUT',
				row: 8,
				col: 0,
				completed: false,
			},
			9: {
				clue: 'Hvorfor er C# bedre end python?',
				answer: 'HURTIGERE',
				row: 9,
				col: 5,
				completed: false,
			},
			11: {
				clue: 'De bedste settings',
				answer: 'SRØNZ',
				row: 11,
				col: 2,
				completed: false,
			},
			12: {
				clue: 'Svaret kan findes der, hvor passwords bedst opbevares',
				answer: 'ISWAN',
				row: 13,
				col: 9,
				completed: false,
			},
		},
		down: {
			1: {
				clue: 'Tema for deep fried Olsen Banden meme onsdag d. 7. december',
				answer: 'DEMENS',
				row: 0,
				col: 12,
				completed: false,
			},
			2: {
				clue: 'Bevinget og berigende dyr',
				answer: 'SVANE',
				row: 5,
				col: 3,
				completed: false,
			},
			4: {
				clue: 'Kunder elsker, når deres søgning er...',
				answer: 'ELASTISK',
				row: 5,
				col: 8,
				completed: false,
			},
			5: {
				clue: 'Slangehviskerens sprog',
				answer: 'PYTHON',
				row: 6,
				col: 5,
				completed: false,
			},
			6: {
				clue: 'Hvis man siger Franz er dårlig til CS, så har man...',
				answer: 'RET',
				row: 7,
				col: 1,
				completed: false,
			},
			7: {
				clue: 'Ubrugelig Pokémon uden ske',
				answer: 'ABRA',
				row: 7,
				col: 12,
				completed: false,
			},
			10: {
				clue: 'What do slay today?',
				answer: 'GOATS',
				row: 9,
				col: 10,
				completed: false,
			},
		},
	},
};

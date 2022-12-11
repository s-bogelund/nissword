import {
	Across,
	Answer,
	CrosswordElements,
	CrosswordType,
	MyClueType,
} from './types';
import SimpleCrypto from 'simple-crypto-js';
const BASE_API_URL = 'https://nissdb.herokuapp.com/api';

export const ENCRYPTION_KEY = 'phantom_menace_bad';
var simple = new SimpleCrypto(ENCRYPTION_KEY);

export const fetchData = async (url: string) => {
	const response = await fetch(url);
	return response.json();
};

export const fetchGameState = async () => {
	const data = await fetchData(`${BASE_API_URL}/crossword`);
	if (!data) return false;

	const decrypted = decryptCrossword(data);
	return decrypted as CrosswordType;
};

export const postGameState = async (gameState: CrosswordType) => {
	// encrypt every answer in the crossword
	const encrypted = encryptCrossword(gameState);

	const response = await fetch(`${BASE_API_URL}/crossword`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*', // Required for CORS support to work
		},
		body: JSON.stringify(encrypted),
	});
	console.log('post response:', response.status);
	if (!response.ok) return;

	return response.json();
};

// export const updateContext = async (setContext: any) => {
// 	const data = await fetchCrossword();
// 	if (data) setContext(data);
// };

// extract all answers from the crossword
export const getAnswers = (crossword: CrosswordType) => {
	let answers = Object.values(crossword.crossword.across).map(
		clue => clue.answer
	);
	answers = [
		...answers,
		...Object.values(crossword.crossword.down).map(clue => clue.answer),
	];
	return answers;
};

// create objects of all answers and whether they are completed
export const getAnswersAndCompleted = (crossword: CrosswordType): Answer[] => {
	let answers = Object.values(crossword.crossword.across).map(clue => ({
		answer: clue.answer,
		completed: clue.completed,
	}));
	answers = [
		...answers,
		...Object.values(crossword.crossword.down).map(clue => ({
			answer: clue.answer,
			completed: clue.completed,
		})),
	];
	return answers;
};

function encryptCrossword(crossword: CrosswordType) {
	if (!crossword.crossword) return crossword;
	const encryptedAcross = Object.values(crossword.crossword.across).map(
		clue => {
			return {
				...clue,
				answer: simple.encrypt(clue.answer),
			};
		}
	);
	const encryptedDown = Object.values(crossword.crossword.down).map(clue => {
		return {
			...clue,
			answer: simple.encrypt(clue.answer),
		};
	});

	// encrypt the whole crossword
	const encrypted = {
		...crossword,
		crossword: {
			across: encryptedAcross,
			down: encryptedDown,
		},
	};
	return encrypted;
}

function decryptCrossword(crossword: CrosswordType): CrosswordType {
	if (!crossword.crossword) return crossword;
	const decryptedAcross = Object.values(crossword.crossword.across).map(
		clue => {
			return {
				...clue,
				answer: simple.decrypt(clue.answer) as string,
			};
		}
	);
	const decryptedDown = Object.values(crossword.crossword.down).map(clue => {
		return {
			...clue,
			answer: simple.decrypt(clue.answer) as string,
		};
	});

	// decrypt the whole crossword
	const decrypted = {
		...crossword,
		crossword: {
			across: decryptedAcross,
			down: decryptedDown,
		},
	};
	// @ts-ignore
	return decrypted;
}

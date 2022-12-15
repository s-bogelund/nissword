import {
	Across,
	Answer,
	CrosswordElements,
	CrosswordType,
	EncryptedCrosswordType,
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

//* ENCRYPTED FETCH
export const fetchGameState = async () => {
	const data = await fetchData(`${BASE_API_URL}/crossword`);
	if (!data) return false;
	console.log(data);

	const decrypted = decryptCrossword(data);
	console.log('decrypted', decrypted);

	return decrypted as CrosswordType;
};

//* ENCRYPTED POST
export const postGameState = async (gameState: CrosswordType) => {
	// console.log('postGameState', gameState);

	const encrypted = encryptCrossword(gameState);

	const response = await fetch(`${BASE_API_URL}/crossword`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*', // Required for CORS support to work
		},
		body: JSON.stringify(encrypted),
	});
	// console.log('post response:', response.status);
	if (!response.ok) return;

	return response.json();
};

// export const fetchGameState = async () => {
// 	const data = await fetchData(`${BASE_API_URL}/crossword`);
// 	if (!data) return false;

// 	const decrypted = data;
// 	// console.log('decrypted', decrypted);

// 	return decrypted as CrosswordType;
// };

// export const postGameState = async (gameState: CrosswordType) => {
// 	console.log('postGameState', gameState);

// 	const encrypted = gameState;

// 	const response = await fetch(`${BASE_API_URL}/crossword`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'Access-Control-Allow-Origin': '*', // Required for CORS support to work
// 		},
// 		body: JSON.stringify(encrypted),
// 	});
// 	// console.log('post response:', response.status);
// 	if (!response.ok) return;

// 	return response.json();
// };

// export const updateContext = async (setContext: any) => {
// 	const data = await fetchCrossword();
// 	if (data) setContext(data);
// };

// extract all answers from the crossword
export const getAnswers = (crossword: CrosswordType): Answer[] => {
	console.log('getAnswers', crossword);

	let answers = Object.values(crossword.crossword.across).map(clue => {
		return {
			answer: clue.answer,
			completed: clue.completed,
			id: clue.id,
		};
	});

	answers = [
		...answers,
		...Object.values(crossword.crossword.down).map(clue => {
			return {
				answer: clue.answer,
				completed: clue.completed,
				id: clue.id,
			};
		}),
	];
	console.log('answers from get', answers);
	return answers;
};

// create objects of all answers and whether they are completed
// export const getAnswersAndCompleted = (crossword: CrosswordType) => {
// 	const answers = getAnswers(crossword);
// 	const answersAndCompleted = answers.map(answer => {
// 		return {
// 			answer,
// 			completed: false,
// 		};
// 	});
// 	return answersAndCompleted;
// };

export const updateCrosswordFromAnswers = (
	crossword: CrosswordType,
	answers: Answer[]
) => {
	const updatedCrossword = { ...crossword };
	answers.forEach(answer => {
		const clue = getClueFromId(crossword, answer.id);
		if (clue) {
			clue.completed = answer.completed;
		}
	});
	return updatedCrossword;
};

function getClueFromAnswer(crossword: CrosswordType, answer: string) {
	const across = Object.values(crossword.crossword.across).find(
		clue => clue.answer === answer
	);
	const down = Object.values(crossword.crossword.down).find(
		clue => clue.answer === answer
	);
	return across || down;
}

function getClueFromId(crossword: CrosswordType, id: string) {
	const across = Object.values(crossword.crossword.across).find(
		clue => clue.id === id
	);
	const down = Object.values(crossword.crossword.down).find(
		clue => clue.id === id
	);
	return across || down;
}

function encryptCrossword(
	crossword: CrosswordType
): EncryptedCrosswordType | false {
	if (!crossword.crossword) return false;

	const encrypted = {
		...crossword,
		crossword: {
			across: simple.encrypt(crossword.crossword.across),
			down: simple.encrypt(crossword.crossword.down),
		},
	};
	// console.log('encrypted', encrypted);
	// console.log('decrypt encrypt', simple.decrypt(encrypted.crossword.across));

	return encrypted;
}

function decryptCrossword(
	crossword: EncryptedCrosswordType
): CrosswordType | false {
	if (!crossword.crossword) return false;

	const decrypted = {
		...crossword,
		crossword: {
			across: simple.decrypt(crossword.crossword.across),
			down: simple.decrypt(crossword.crossword.down),
		} as CrosswordElements,
	};

	//@ts-ignore
	return decrypted;
}

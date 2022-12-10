import { Answer, CrosswordType } from './types';

const BASE_API_URL = 'https://nissdb.herokuapp.com/api';
const LOCAL_API_URL = 'http://localhost:4000/';
const LOCAL_API_URL2 = 'http://localhost:1337/';
const TOKEN =
	'3bc5a3f92ce5c8c5fbab45b7594d79726093be921b66972842e4f244e044216bdad5834111323a0d9d001aafc03e35ce34e9c5c5b86aee9d8c01a18f4a0127f460718c5b4597ee8452d11015f7832403bdc5239c68143e89ee26e1b9e8ea9e71fdaa640324ac4fe6049cf45e87f8a8ae6f6d41addc1283b6fb635e7099293400';
export const fetchData = async (url: string) => {
	const response = await fetch(url);
	return response.json();
};

export const fetchGameState = async () => {
	const data: CrosswordType = await fetchData(`${BASE_API_URL}/crossword`);
	if (data) return data;
};

export const postGameState = async (context: CrosswordType) => {
	console.log('post:', context);

	const response = await fetch(`${BASE_API_URL}/crossword`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*', // Required for CORS support to work
		},
		body: JSON.stringify(context),
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

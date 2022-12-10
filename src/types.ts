import {
	CluesInputOriginal,
	ClueTypeOriginal,
	Direction,
} from '@jaredreisinger/react-crossword/dist/types';

export type CrosswordType = {
	currentTimer: number;
	initialTimer: number;
	completed: boolean;
	crossword: CrosswordElements;
};

export type CrosswordElements = {
	across: Record<string, MyClueType>;
	down: Record<string, MyClueType>;
};

type MyClueType = {
	completed: boolean;
} & ClueTypeOriginal;

export type Answer = {
	answer: string;
	completed: boolean;
};

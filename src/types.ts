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

export type MyClueType = {
	completed: boolean;
} & ClueTypeOriginal;

export type Across = Record<string, MyClueType>;
export type Down = Record<string, MyClueType>;

export type Answer = {
	answer: string;
	completed: boolean;
};

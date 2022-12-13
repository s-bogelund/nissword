import {
	CluesInputOriginal,
	ClueTypeOriginal,
	Direction,
} from '@jaredreisinger/react-crossword/dist/types';
import SimpleCrypto from 'simple-crypto-js';

export type CrosswordType = {
	currentTimer: number;
	initialTimer: number;
	shouldSorenBeTryingToCheat: string;
	completed: boolean;
	crossword: CrosswordElements;
};

export type EncryptedCrosswordType = {
	currentTimer: number;
	initialTimer: number;
	completed: boolean;
	crossword: EncryptedCrosswordElements;
};

export type CrosswordElements = {
	across: Record<string, MyClueType>;
	down: Record<string, MyClueType>;
};

export type EncryptedCrosswordElements = {
	across: string;
	down: string;
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

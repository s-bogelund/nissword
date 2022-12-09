import React, { FC, useEffect } from 'react';

import { Crossword as CrosswordLib } from '@jaredreisinger/react-crossword';

const data = {
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
	// 	3: {
	// 		clue: 'two plus two',
	// 		answer: 'error',
	// 		row: 2,
	// 		col: 2,
	// },
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
const data2 = {
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
			clue: 'three minus two',
			answer: 'ONE',
			row: 4,
			col: 3,
		},
	},
};

type CrosswordProps = {} & React.HTMLAttributes<HTMLDivElement>;

const Crossword: FC<CrosswordProps> = () => {
	const [color, setColor] = React.useState('#aaaaaa');
	const [dataState, setDataState] = React.useState(data);
	const [lastKey, setLastKey] = React.useState('');
	const handleCorrect = (text: string) => {
		let guesses = localStorage.getItem('crossword');
		if (guesses) guesses = JSON.parse(guesses).guesses;
		console.log(guesses);
		setDataState(data2);
	};

	useEffect(() => {
		const solved = localStorage.getItem('hasBeenSolved');
		const epicPassword = localStorage.getItem('epicPassword');
		const guesses = localStorage.getItem('guesses');

		if (!solved) {
			localStorage.setItem('hasBeenSolved', 'false');
		}
		if (solved === 'true') {
			alert('Sig mig hvad fuck er det du prøver på??');
			localStorage.setItem('hasBeenSolved', 'false');
		}
		if (!epicPassword) {
			localStorage.setItem('epicPassword', 'ISwan');
		}
		updateFromRealStorage();
	}, []);

	return (
		<div className="grid grid-cols-crossword space w-full h-full">
			<CrosswordLib
				onAnswerCorrect={() => handleCorrect('onAnswerCorrect')}
				onCorrect={() => {}}
				onCrosswordCorrect={() => {}}
				onCellChange={(row, col, char) => {
					if (char) updateRealStorage();
				}}
				acrossLabel="Horizontal"
				downLabel="Vertical"
				data={dataState}
				storageKey="crossword"
				useStorage={true}
				theme={{
					gridBackground: '#54637944',
					cellBackground: color,
					numberColor: '#6c70c5',
					highlightBackground: '#dddddd',
					focusBackground: '#4444cc',
					columnBreakpoint: '100px',
				}}
			/>
		</div>
	);

	function updateRealStorage() {
		const crossword = localStorage.getItem('crossword');
		if (!crossword) return;

		const myCrossword = JSON.parse(crossword);
		localStorage.setItem('myCrossword', JSON.stringify(myCrossword));
	}

	function updateFromRealStorage() {
		const myCrossword = localStorage.getItem('myCrossword');
		if (!myCrossword) return;
		const crossword = JSON.parse(myCrossword);
		localStorage.setItem('crossword', JSON.stringify(crossword));
	}
};

export default Crossword;

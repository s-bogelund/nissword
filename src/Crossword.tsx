import React, { FC, useEffect } from 'react';
import { data1, data2 } from './data';
import { Crossword as CrosswordLib } from '@jaredreisinger/react-crossword';

type CrosswordProps = {} & React.HTMLAttributes<HTMLDivElement>;

const Crossword: FC<CrosswordProps> = () => {
	const [color, setColor] = React.useState('#aaaaaa');
	const [dataState, setDataState] = React.useState(data2);
	const [lastKey, setLastKey] = React.useState('');
	const handleCorrect = (text: string) => {
		//* Do something here
		// setDataState(data2);
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
				onCorrect={() => {
					console.log('onCorrect');
				}}
				onCrosswordCorrect={() => {
					alert("You've solved the puzzle!");
				}}
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
					highlightBackground: '#dddddd14',
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

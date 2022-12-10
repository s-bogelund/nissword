import React, { FC, PointerEvent, useEffect, useMemo } from 'react';
import { data1, data2 } from './data';
import { Crossword as CrosswordLib } from '@jaredreisinger/react-crossword';
import {
	CluesInputOriginal,
	ClueTypeOriginal,
	Direction,
} from '@jaredreisinger/react-crossword/dist/types';
import { postGameState } from './api';

type CrosswordProps = {
	data: CluesInputOriginal;
	onUpdate: (data: CluesInputOriginal) => void;
	onCorrect: (direction: Direction, num: string, answer: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const Crossword: FC<CrosswordProps> = ({ data, onUpdate, onCorrect }) => {
	const [color, setColor] = React.useState('#aaaaaa');
	const [dataState, setDataState] = React.useState(data);
	const [lastKey, setLastKey] = React.useState('');

	const updatedData = useMemo(() => {
		console.log('dataState: ', data);

		return data;
	}, []);

	useEffect(() => {
		const solved = localStorage.getItem('crosswordSolved');
		const epicPassword = localStorage.getItem('epicPassword');

		console.log('data', data);

		if (!solved) {
			localStorage.setItem('crosswordSolved', 'false');
		}
		if (solved === 'true') {
			alert('Nåå, der troede du lige, at du var smart, hva?');
			localStorage.setItem('crosswordSolved', 'false');
		}
		if (!epicPassword) {
			localStorage.setItem('epicPassword', 'ISwan');
		}
		updateFromRealStorage();
	}, []);

	return (
		<>
			{data && (
				<div
					className="grid grid-cols-crossword space w-full h-full"
					onKeyDown={() => updateRealStorage(null)}
					onPointerMove={e => updateRealStorage(e)}
				>
					<CrosswordLib
						onAnswerCorrect={(direction, number, answer) => {
							onCorrect(direction, number, answer);
						}}
						onCorrect={(direction, number, answer) => {
							onCorrect(direction, number, answer);
						}}
						onCrosswordCorrect={() => {
							alert("You've solved the puzzle!");
						}}
						acrossLabel="Horizontal"
						downLabel="Vertical"
						data={updatedData}
						storageKey="crossword"
						useStorage={true}
						theme={{
							gridBackground: 'transparent',
							// gridBackground: '#54637944',
							cellBackground: color,
							numberColor: '#6c70c5',
							highlightBackground: '#dddddd14',
							focusBackground: '#4444cc',
							columnBreakpoint: '100px',
						}}
					/>
				</div>
			)}
		</>
	);

	function updateRealStorage(e: PointerEvent<HTMLDivElement> | null) {
		const crossword = localStorage.getItem('crossword');
		if (!crossword) return;

		const myCrossword = JSON.parse(crossword);
		localStorage.setItem('myCrossword', JSON.stringify(myCrossword));
		if (!e?.target) onUpdate(updatedData);
	}

	function updateFromRealStorage() {
		const myCrossword = localStorage.getItem('myCrossword');
		if (!myCrossword) return;
		const crossword = JSON.parse(myCrossword);
		localStorage.setItem('crossword', JSON.stringify(crossword));
	}
};

export default Crossword;

import React, { FC, PointerEvent, useEffect, useMemo } from 'react';
import { data1 } from '../data';
import { Crossword as CrosswordLib } from '@jaredreisinger/react-crossword';
import {
	CluesInputOriginal,
	ClueTypeOriginal,
	Direction,
} from '@jaredreisinger/react-crossword/dist/types';
import { postGameState } from '../api';

type CrosswordProps = {
	data: CluesInputOriginal;
	onUpdate: (data: CluesInputOriginal) => void;
	onCorrect: (direction: Direction, num: string, answer: string) => void;
	triedToCheat: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const Crossword: FC<CrosswordProps> = ({
	data,
	onUpdate,
	onCorrect,
	triedToCheat,
}) => {
	const updatedData = useMemo(() => {
		console.log('dataState: ', data);

		return data;
	}, []);

	useEffect(() => {
		const solved = localStorage.getItem('crosswordSolved');

		console.log('data', data);

		if (!solved) {
			// localStorage.setItem('crosswordSolved', 'false');
		}
		if (solved === 'true') {
			triedToCheat();
			localStorage.setItem('crosswordSolved', 'false');
			localStorage.setItem('ErSørenDum?', 'Ja');
		}
		updateFromRealStorage();
	}, []);

	const slightlyBrighter = (color: string) => {
		const hex = color.replace('#', '');
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);

		const r2 = Math.min(255, r + 20);
		const g2 = Math.min(255, g + 20);
		const b2 = Math.min(255, b + 20);

		const newColor =
			'#' +
			('0' + r2.toString(16)).slice(-2) +
			('0' + g2.toString(16)).slice(-2) +
			('0' + b2.toString(16)).slice(-2);

		return newColor;
	};

	return (
		<>
			{data && (
				<div
					className="grid grid-cols-crossword space w-full h-full gap-1"
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
							// alert("You've solved the puzzle!");
						}}
						acrossLabel="Horizontal"
						downLabel="Vertical"
						data={updatedData}
						storageKey="crossword"
						useStorage={true}
						theme={{
							gridBackground: 'transparent',
							focusBackground: '#f5f5d020',
							cellBackground: '#8a85ff',
							numberColor: '#6c70c5',
							highlightBackground: slightlyBrighter('#274071'),
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

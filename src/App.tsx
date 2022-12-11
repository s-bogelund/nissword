import { useEffect, useMemo, useState } from 'react';
import {
	fetchGameState,
	getAnswers,
	getAnswersAndCompleted,
	postGameState,
} from './api';
import SimpleCrypto from 'simple-crypto-js';
import reactLogo from './assets/react.svg';
import CountDown from './Countdown';
import Crossword from './Crossword';
import MyPage from './Crossword';
import { Answer, CrosswordType as GameState } from './types';
import { data2 } from './data';
import { CluesInputOriginal } from '@jaredreisinger/react-crossword/dist/types';

function App() {
	// const [countDownColor, setCountDownColor] = useState('text-slate-100');
	const [gameState, setGameState] = useState({} as GameState);
	const [answers, setAnswers] = useState<Answer[]>([]);
	// const [crossword, setCrossword] = useState({} as CluesInputOriginal);
	const clearLocalStorage = () => {
		localStorage.clear();
		window.location.reload();
	};

	useEffect(() => {
		if (gameState.currentTimer < 575) {
			postGameState(gameState);
		}
	}, [gameState.currentTimer]);

	async function seedDb() {
		const response = await postGameState(data2);
		console.log(response);
	}

	useEffect(() => {
		const crosswordFetcher = async () => {
			let fetchedGameState = await fetchGameState();
			if (!fetchedGameState) return;

			console.log('fetchedGameState', fetchedGameState);
			if (!fetchedGameState?.crossword) {
				console.log('no gamestate, seeding db', fetchedGameState);
				await seedDb();
				fetchedGameState = await fetchGameState();
			}
			if (!fetchedGameState) return;

			const answers = getAnswersAndCompleted(fetchedGameState);
			console.log('answers: ', answers);
			setAnswers(answers);
			setGameState(fetchedGameState);
		};
		crosswordFetcher();
	}, []);

	const updateCrosswordTimer = (timer: number) => {
		if (!gameState) return;
		const updatedCrossword = {
			...gameState,
			currentTimer: timer,
		};
		setGameState(updatedCrossword);
	};

	const currentTimer = gameState?.currentTimer;
	const crosswordToPass = gameState?.crossword;
	const initialTimer = useMemo(() => {
		if (gameState) return gameState.initialTimer;
		else return 0;
	}, [gameState]);
	const handleCrossWordUpdate = (newCrossword: CluesInputOriginal) => {
		console.log('newCrossword: ', newCrossword);
	};

	const handleCorrect = (direction: string, number: string, answer: string) => {
		// set correct to true on the correct answer
		console.log('correct: ', direction, number, answer);
		if (!gameState?.crossword) return;
		if ((direction = 'across')) {
			const newState = {
				...gameState,
				crossword: {
					...gameState.crossword,
					across: {
						...gameState.crossword.across,
						[number]: {
							...gameState.crossword.across[number],
							completed: true,
						},
					},
				},
			};

			setGameState(newState);
		}
		if ((direction = 'down')) {
			const newState = {
				...gameState,
				crossword: {
					...gameState.crossword,
					down: {
						...gameState.crossword.down,
						[number]: {
							...gameState.crossword.down[number],
							completed: true,
						},
					},
				},
			};
			setGameState(newState);
		}

		// find answer in answers and set correct to true
		const answerToUpdate: Answer | undefined = answers.find(
			a => a.answer === answer
		);
		if (answerToUpdate) {
			answerToUpdate.completed = true;
			setAnswers([...answers]);
		}
	};

	return (
		<>
			{currentTimer && gameState && (
				<div
					data-theme="night"
					className="flex flex-col items-center relative min-h-[100vh] w-[100vw]"
				>
					{currentTimer && gameState && (
						<div className="flex flex-col items-center mt-24 w-full">
							<CountDown
								onCounterUpdate={timer => updateCrosswordTimer(timer)}
								currentTimer={currentTimer}
								initialTimer={initialTimer}
							/>
							<button
								className="btn btn-secondary absolute left-15 top-3"
								onClick={() => clearLocalStorage()}
							>
								Clear Localstorage
							</button>
							<button
								className="btn btn-secondary absolute left-5 top-3"
								// onClick={() => crosswordFetcher()}
							>
								Get Data
							</button>
							<button
								className="btn btn-secondary absolute left-5 top-15"
								onClick={() => seedDb()}
							>
								Seed Data Base
							</button>
							<h1 className="text-secondary text-6xl font-semibold mb-20">
								Sørens Store Krydsord
							</h1>
							<div className="justify-center text-lg text-secondary md:w-full w-[900px] h-[500px] max-w-[1000px] max-h-[1000px] ">
								{gameState.crossword && (
									<Crossword
										onCorrect={(direction, number, answer) =>
											handleCorrect(direction, number, answer)
										}
										onUpdate={newCrossword =>
											handleCrossWordUpdate(newCrossword)
										}
										data={crosswordToPass}
									/>
								)}
							</div>
						</div>
					)}
				</div>
			)}
			)
		</>
	);
}

export default App;

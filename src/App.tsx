import { useEffect, useMemo, useRef, useState } from 'react';
import {
	fetchGameState,
	getAnswers,
	getAnswersAndCompleted,
	postGameState,
	updateCrosswordFromAnswers,
} from './api';
import SimpleCrypto from 'simple-crypto-js';
import reactLogo from './assets/react.svg';
import CountDown from './components/Countdown';
import Crossword from './components/Crossword';
import MyPage from './components/Crossword';
import { Answer, CrosswordType as GameState } from './types';
import { data3 } from './data';
import YoutTubeModal from './components/modals/YoutubeModal';
import Alert from './components/Alert';
import WinnerModal from './components/modals/WinnerModal';

function App() {
	const [gameState, setGameState] = useState({} as GameState);
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [postToDbToggle, setPostToDbToggle] = useState(false);
	const [timerRunOut, setTimerRunOut] = useState(false);
	const [showYtModal, setShowYtModal] = useState(false);
	const [hasWon, setHasWon] = useState(false);
	const [isAllowedToCloseModal, setIsAllowedToCloseModal] = useState(false);
	const [pointerEventOver, setPointerEventOver] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [firstArnoldFound, setFirstArnoldFound] = useState(false);
	const modalButtonRef = useRef<HTMLButtonElement>(null);
	const [keyPressed, setKeyPressed] = useState([] as string[]);
	const audio = new Audio('src/assets/grunt1.mp3');

	const clearLocalStorage = () => {
		localStorage.clear();
		window.location.reload();
	};
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

			const answers = getAnswers(fetchedGameState);
			console.log('answers: ', answers);
			setAnswers(answers);
			setGameState(fetchedGameState);
		};
		crosswordFetcher();
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', e => {
			e.preventDefault();

			if (e.key === keyPressed[keyPressed.length - 1]) return;

			keyPressed.push(e.key);

			keyPressed.splice(-6, keyPressed.length - 5);
			console.log('keyPressed', keyPressed);

			if (keyPressed.join('').toUpperCase() === 'GRYNT') {
				audio.play();
			}
		});
	}, []);

	useEffect(() => {
		if (gameState.currentTimer < 575 && gameState.crossword) {
			console.log('posting state to db', gameState);
			postGameState(gameState);
		}

		if (timerRunOut) {
			postGameState(gameState);
			// window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
		}
	}, [gameState.currentTimer, timerRunOut]);

	async function seedDb() {
		const response = await postGameState(data3);
		console.log(response);
	}

	useEffect(() => {
		if (gameState.crossword) {
			console.log('posting state to db', gameState);
			if (allAnswersFound(answers)) {
				const newGameState = {
					...gameState,
					completed: true,
				};
				setGameState(newGameState);
				setHasWon(newGameState.completed);
			}
			postGameState(gameState);
		}
	}, [postToDbToggle]);

	const updateCrosswordTimer = (timer: number) => {
		if (!gameState) return;
		const updatedCrossword = {
			...gameState,
			currentTimer: timer,
		};
		setGameState(updatedCrossword);
	};

	const listenForAudio = (e: any) => {
		// if L and Y and D are all pressed, play audio
		if (e.key === 'L' && e.key === 'Y' && e.key === 'D') {
			console.log('audio', audio);
			audio.play();
		}
	};

	const handlePointerModalLaunch = () => {
		if (showYtModal || !timerRunOut || pointerEventOver) return;

		// window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
		setPointerEventOver(true);
	};

	const currentTimer = gameState?.currentTimer;
	const crosswordToPass = gameState?.crossword;
	const initialTimer = useMemo(() => {
		if (gameState) return gameState.initialTimer;
		else return 0;
	}, [gameState.initialTimer]);

	useEffect(() => {
		if (!gameState?.crossword) return;
		const newState = updateCrosswordFromAnswers(gameState, answers);

		setGameState(newState);
		setPostToDbToggle(prev => !prev);
	}, [answers]);

	const setShowModalAfterSmallDelay = useMemo(() => {
		if (!showYtModal) return '!opacity-0';
		if (showYtModal) {
			setTimeout(() => {
				return '!flex !opacity-0';
			}, 1000);
		}
		setTimeout(() => {
			setIsAllowedToCloseModal(true);
		}, 10000);
	}, [showYtModal, timerRunOut]);

	return (
		<>
			<YoutTubeModal
				className={`${setShowModalAfterSmallDelay}`}
				isOpen={showYtModal}
				onClose={() => isAllowedToCloseModal && setShowYtModal(false)}
			/>
			<WinnerModal isOpen={hasWon} onClose={() => setHasWon(false)} />
			{currentTimer && gameState && (
				<div
					onPointerMove={() => {
						// handlePointerModalLaunch();
					}}
					onKeyDown={() => listenForAudio((e: any) => listenForAudio(e))}
					onClick={() => handlePointerModalLaunch()}
					data-theme="night"
					className="flex flex-col relative items-center min-h-[100vh] w-[100vw]"
				>
					{currentTimer && gameState && (
						<div
							className="flex flex-col items-center mt-8 w-full"
							id="modal-root"
						>
							<CountDown
								onCounterEnd={() => setTimerRunOut(true)}
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
								className="btn btn-secondary absolute left-5 top-3 w-14 !max-h-12 text-xs"
								onClick={() => setShowYtModal(true)}
								ref={modalButtonRef}
							>
								Modal
							</button>

							<button
								className="btn btn-secondary absolute left-5 top-15"
								onClick={() => seedDb()}
							>
								Seed Data Base
							</button>
							<button
								className="btn btn-secondary absolute left-5 bottom-10"
								onClick={() =>
									window.open(
										'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
										'_blank'
									)
								}
							>
								Press Other Button
							</button>
							<h1 className="text-secondary text-5xl font-semibold mb-10">
								Sørens Store Krydsord Om Alting
							</h1>
							<div className=" w-full h-fit max-w-[1450px] max-h-[1100px] ">
								{gameState.crossword && (
									<Crossword
										triedToCheat={() => setShowYtModal(true)}
										onCorrect={(direction, number, answer) =>
											updateAnswers(answer)
										}
										onUpdate={newCrossword => {}}
										data={crosswordToPass}
									/>
								)}
							</div>
						</div>
					)}
					{showAlert && <Alert />}
				</div>
			)}
		</>
	);

	function updateAnswers(answer: string) {
		let answerToUpdate: Answer[] | undefined = answers.filter(
			a => a.answer === answer
		);
		console.log('answerToUpdate: ', answerToUpdate);

		if (!answerToUpdate) return;
		if (answerToUpdate[0].answer === 'ARNOLD') setFirstArnoldFound(true);

		if (answerToUpdate[0].answer === 'ARNOLD' && firstArnoldFound) {
			if (answerToUpdate[1].completed !== true) {
				answerToUpdate[1].completed = true;
				setShowAlert(true);
			}
		} else {
			if (answerToUpdate[0].completed === true) return;
			setShowAlert(true);
			answerToUpdate[0].completed = true;
		}
		console.log('answerToUpdate 2: ', answerToUpdate);

		setAnswers([...answers]);
		console.log('answers from updateAnswers: ', answers);

		setTimeout(() => {
			setShowAlert(false);
		}, 3000);
	}

	function allAnswersFound(answers: Answer[]) {
		return answers.every(a => a.completed);
	}
}

export default App;

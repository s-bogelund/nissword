import { useEffect, useMemo, useRef, useState } from 'react';
import {
	fetchGameState,
	getAnswers,
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
import FakeWinnerModal from './components/modals/ActualWinModal';
import FakeLossModal from './components/modals/FakeLossModal';

function App() {
	const [gameState, setGameState] = useState({} as GameState);
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [postToDbToggle, setPostToDbToggle] = useState(false);
	const [timerRunOut, setTimerRunOut] = useState(false);
	const [showYtModal, setShowYtModal] = useState(false);
	const [hasFakeLost, setHasFakeLost] = useState(false);
	const [hasWon, setHasWon] = useState(false);
	const [isAllowedToCloseYtModal, setIsAllowedToCloseYtModal] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [alarmHasPlayed, setAlarmHasPlayed] = useState(false);
	const [hasFakeWon, setHasFakeWon] = useState(false);
	const [showSomething, setShowSomething] = useState(false);
	const [keyPressed] = useState([] as string[]);
	const grunt = new Audio('src/assets/grunt1.mp3');
	const alarm = new Audio('src/assets/alarm.wav');
	const bubblegum = new Audio('src/assets/bubblegum.mp3');

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
			if (e.key === keyPressed[keyPressed.length - 1] && e.key !== 's') return;

			keyPressed.push(e.key);

			const lastFive = keyPressed.slice(-5);
			console.log('lastFive', lastFive);

			if (lastFive.join('').toUpperCase() === 'GRYNT') {
				grunt.play();
			}
			const lastSeven = keyPressed.slice(-7);
			console.log('lastSeven', lastSeven);

			if (lastSeven.join('').toUpperCase() === 'KICKASS') {
				bubblegum.play();
			}

			if (keyPressed.length > 18) {
				keyPressed.splice(0, keyPressed.length - 8);
				console.log('keyPressed', keyPressed);
			}
		});
	}, []);

	useEffect(() => {
		if (gameState.currentTimer < 1140 && gameState.crossword) {
			postGameState(gameState);
		}

		if (timerRunOut) {
			postGameState(gameState);
		}
	}, [gameState.currentTimer, timerRunOut]);

	async function seedDb() {
		const response = await postGameState(data3);
		console.log(response);
	}

	useEffect(() => {
		if (gameState.crossword) {
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

	const nextPhaseBegun = useMemo(() => {
		if (gameState?.something?.length > 0) return true;
		else return false;
	}, [gameState?.something]);

	const handleTimeRunOut = () => {
		console.log('time run out');

		setTimerRunOut(true);
		const newGameState = {
			...gameState,
			something: ['1'],
		};
		setGameState(newGameState);
		setHasFakeLost(true);
		if (!nextPhaseBegun) {
			alarm.play();
			setAlarmHasPlayed(true);
		}
	};

	const currentTimer = useMemo(
		() => gameState?.currentTimer,
		[gameState?.currentTimer]
	);
	const crosswordToPass = gameState?.crossword;

	const initialTimer = useMemo(() => {
		if (gameState) return gameState.initialTimer;
		else return 0;
	}, [gameState?.initialTimer]);

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
			setIsAllowedToCloseYtModal(true);
		}, 7000);
		console.log('isAllowedToCloseYtModal', isAllowedToCloseYtModal);
	}, [showYtModal, timerRunOut]);

	const hasBeenRickRolled = useMemo(() => {
		const hasBeenRickRolled = localStorage.getItem('hasBeenRickRolled');
		if (!!hasBeenRickRolled) return true;
		else return false;
	}, [timerRunOut, showYtModal]);

	const handleYoutubeModalClose = () => {
		setShowYtModal(false);
		localStorage.setItem('hasBeenRickRolled', 'true');
	};

	return (
		<>
			<>
				<FakeLossModal
					isOpen={hasFakeLost && !showYtModal && !hasBeenRickRolled}
					onClose={() => {}}
				/>
				<YoutTubeModal
					className={`${setShowModalAfterSmallDelay}`}
					isOpen={showYtModal && !hasBeenRickRolled}
					onClose={() => isAllowedToCloseYtModal && handleYoutubeModalClose()}
				/>
			</>
			)
			<FakeWinnerModal
				isOpen={!nextPhaseBegun && hasFakeWon}
				onClose={() => setHasWon(false)}
			/>
			{gameState && (
				<div
					data-theme="night"
					className="flex flex-col relative items-center min-h-[100vh] w-[100vw]"
				>
					{gameState && (
						<div
							className="flex flex-col items-center mt-8 w-full"
							id="modal-root"
						>
							{!!gameState?.currentTimer && (
								<CountDown
									ended={hasFakeLost && hasBeenRickRolled}
									shouldStop={hasWon}
									onCounterEnd={() => {
										handleTimeRunOut();
									}}
									onCounterUpdate={timer => updateCrosswordTimer(timer)}
									currentTimer={currentTimer}
									initialTimer={initialTimer}
								/>
							)}
							<button
								className="btn btn-secondary absolute left-15 top-3"
								onClick={() => clearLocalStorage()}
							>
								Clear Localstorage
							</button>

							<button
								className="btn btn-secondary absolute left-5 top-15"
								onClick={() => seedDb()}
							>
								Seed Data Base
							</button>
							<h1 className="text-secondary text-5xl font-semibold mb-10">
								Sørens Store Krydsord Om Alting
							</h1>
							<div className=" w-full h-fit max-w-[1550px] max-h-[1100px] ">
								{gameState.crossword && (
									<Crossword
										triedToCheat={() => setShowYtModal(true)}
										onCorrect={(direction, number, answer) =>
											updateAnswers(number.toString())
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

	function updateAnswers(id: string) {
		let answerToUpdate: Answer | undefined = answers.find(a => a.id === id);

		if (!answerToUpdate || answerToUpdate.completed === true) {
			if (!answerToUpdate) console.log('answerToUpdate is undefined');
			if (answerToUpdate?.completed === true)
				console.log('answer is already completed');

			return;
		}

		const newAnswers = answers.map(a => {
			if (a.id === id) {
				a.completed = true;
			}
			return a;
		});
		setShowAlert(true);

		setAnswers(newAnswers);

		setTimeout(() => {
			setShowAlert(false);
		}, 3000);
	}

	function allAnswersFound(answers: Answer[]) {
		return answers.every(a => a.completed);
	}
}

export default App;

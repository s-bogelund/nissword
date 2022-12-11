import React, {
	ContextType,
	FC,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

type CountDownProps = {
	currentTimer: number;
	initialTimer: number;
	onCounterUpdate: (count: number) => void;
	onCounterEnd: () => void;
};

const CountDown: FC<CountDownProps> = ({
	currentTimer,
	initialTimer,
	onCounterUpdate,
	onCounterEnd,
}) => {
	const [countDown, setCountDown] = useState(currentTimer);
	const [testCountDown, setTestCountDown] = useState(currentTimer);
	const [speedMultiplier, setSpeedMultiplier] = useState(10);
	const [adjustTimerAfterReload, setAdjustTimerAfterReload] = useState(
		currentTimer < initialTimer
	);
	const minutes = Math.floor(countDown / 60);
	const testMinutes = Math.floor(testCountDown / 60);
	const seconds = countDown % 60;
	const testSeconds = testCountDown % 60;

	useEffect(() => {
		if (countDown === 0) {
			onCounterEnd();
			return;
		}
		// TODO: THIS SHOULDN'T BE COMMENTED OUT
		const interval = setInterval(() => {
			setCountDown(prev => prev - 1);
			if (countDown % 5 === 0) onCounterUpdate(countDown);
		}, countDownSpeed);

		return () => clearInterval(interval);
	}, [countDown]);

	useEffect(() => {
		if (countDown === 0) return;
		const interval = setInterval(() => {
			setTestCountDown(prev => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [testCountDown]);

	const countDownSpeed = useMemo(() => {
		if (adjustTimerAfterReload) {
			setSpeedMultiplier(handleReloadMultiplier());
		}
		if (countDown > 0.75 * initialTimer)
			setSpeedMultiplier(prev => prev - 0.011);
		else if (countDown > 0.5 * initialTimer)
			setSpeedMultiplier(prev => prev - 0.015);
		else setSpeedMultiplier(prev => prev - 0.005);

		return speedMultiplier * 100;
	}, [countDown]);

	const countDownColor = useMemo(() => {
		setAdjustTimerAfterReload(false);
		if (countDown > 0.9 * initialTimer) return 'text-green-600';
		else if (countDown > 0.8 * initialTimer) return 'text-green-500';
		else if (countDown > 0.7 * initialTimer) return 'text-green-400';
		else if (countDown > 0.6 * initialTimer) return 'text-green-300';
		else if (countDown > 0.5 * initialTimer) return 'text-yellow-500';
		else if (countDown > 0.4 * initialTimer) return 'text-orange-400';
		else if (countDown > 0.3 * initialTimer) return 'text-orange-500';
		else if (countDown > 0.2 * initialTimer) return 'text-orange-500';
		else if (countDown > 0.1 * initialTimer) return 'text-red-500';
		else return 'text-red-700';
	}, [countDown]);

	// <span
	// 	className={`countdown gap-1 text-4xl font-semibold mb-2 ${countDownColor}`}
	// >
	// 	{/* @ts-ignore */}
	// 	<span style={{ '--value': minutes }}></span>:{/* @ts-ignore */}
	// 	<span style={{ '--value': seconds }}></span>
	// </span>
	return (
		<div className="absolute flex flex-col items-center right-12 top-12 w-24">
			<div
				className={`flex justify-between w-20 text-4xl font-semibold mb-2 ${countDownColor}`}
			>
				{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
			</div>
			<h1 className={`text-xl font-semibold mb-2 + ${countDownColor}`}>
				{Math.round(countDownSpeed)}
			</h1>
			{/* <h1 className={`text-xl font-semibold mb-2 + ${countDownColor}`}>
				{testMinutes}:{testSeconds < 10 ? `0${testSeconds}` : testSeconds}
			</h1> */}
		</div>
	);

	function handleReloadMultiplier(): number {
		console.log(
			'handleReloadMultiplier -> currentTimer',
			currentTimer,
			initialTimer
		);

		if (currentTimer > 0.9 * initialTimer) return 9.4;
		else if (currentTimer > 0.8 * initialTimer) return 9;
		else if (currentTimer > 0.7 * initialTimer) return 8.5;
		else if (currentTimer > 0.6 * initialTimer) return 8;
		else if (currentTimer > 0.5 * initialTimer) return 7.5;
		else if (currentTimer > 0.4 * initialTimer) return 7;
		else if (currentTimer > 0.3 * initialTimer) return 6.5;
		else if (currentTimer > 0.2 * initialTimer) return 6;
		else if (currentTimer > 0.1 * initialTimer) return 5.5;
		else return 5;
	}
};

export default CountDown;

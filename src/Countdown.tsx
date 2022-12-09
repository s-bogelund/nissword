import React, { FC, useEffect, useMemo, useState } from 'react';

type CountDownProps = { timer: number };

const CountDown: FC<CountDownProps> = ({ timer }) => {
	const [countDown, setCountDown] = useState(timer);
	const [testCountDown, setTestCountDown] = useState(timer);
	const [speedMultiplier, setSpeedMultiplier] = useState(10);
	const [hasBeenAlerted, setHasBeenAlerted] = useState(false);
	const minutes = Math.floor(countDown / 60);
	const testMinutes = Math.floor(testCountDown / 60);
	const seconds = countDown % 60;
	const testSeconds = testCountDown % 60;

	useEffect(() => {
		if (countDown === 0) return;
		const interval = setInterval(() => {
			setCountDown(prev => prev - 1);
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
		if (countDown > 0.75 * timer) setSpeedMultiplier(prev => prev - 0.011);
		else if (countDown > 0.5 * timer) setSpeedMultiplier(prev => prev - 0.015);
		else setSpeedMultiplier(prev => prev - 0.005);

		return speedMultiplier * 100;
	}, [countDown]);

	const countDownColor = useMemo(() => {
		if (countDown > 0.9 * timer) return 'text-green-600';
		else if (countDown > 0.8 * timer) return 'text-green-500';
		else if (countDown > 0.7 * timer) return 'text-green-400';
		else if (countDown > 0.6 * timer) return 'text-green-300';
		else if (countDown > 0.5 * timer) return 'text-yellow-500';
		else if (countDown > 0.4 * timer) return 'text-orange-400';
		else if (countDown > 0.3 * timer) return 'text-orange-500';
		else if (countDown > 0.2 * timer) return 'text-orange-500';
		else if (countDown > 0.1 * timer) return 'text-red-500';
		else return 'text-red-700';
	}, [countDown]);

	return (
		<div className="absolute flex flex-col items-center right-8 top-8 w-24">
			<h1 className={`text-4xl font-semibold mb-2 ${countDownColor}`}>
				{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
			</h1>
			{/* <h1 className={`text-4xl font-semibold mb-20 mr-20 + ${countDownColor}`}>
				{testMinutes}:{testSeconds < 10 ? `0${testSeconds}` : testSeconds}
			</h1> */}
			<h1 className={`text-xl font-semibold mb-2 + ${countDownColor}`}>
				{Math.round(countDownSpeed)}
			</h1>
			<h1 className={`text-xl font-semibold mb-2 + ${countDownColor}`}>
				{testMinutes}:{testSeconds < 10 ? `0${testSeconds}` : testSeconds}
			</h1>
		</div>
	);
};

export default CountDown;

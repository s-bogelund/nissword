import { useEffect, useMemo, useState } from 'react';
import reactLogo from './assets/react.svg';
import CountDown from './Countdown';
import Crossword from './Crossword';
import MyPage from './Crossword';

function App() {
	// const [countDownColor, setCountDownColor] = useState('text-slate-100');

	return (
		<div
			data-theme="night"
			className="flex flex-col items-center relative min-h-[100vh] w-[100vw]"
		>
			<div className="flex flex-col items-center mt-24 w-full">
				<CountDown timer={600} />
				<h1 className="text-secondary text-6xl font-semibold mb-20">
					Sørens Store Krydsord
				</h1>
				<div className="flex flex-row justify-center text-lg text-secondary md:w-full w-[900px] h-[500px] max-w-[1000px] max-h-[1000px] ">
					<Crossword />
				</div>
			</div>
		</div>
	);
}

export default App;

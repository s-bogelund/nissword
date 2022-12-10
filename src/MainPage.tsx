// import React, { FC } from 'react';
// import CountDown from './Countdown';
// import Crossword from './Crossword';

// type MainPageProps = {countdownProps: {currentTimer: number, initialTimer: number, onCounterUpdate: (count: number) => void}};

// const MainPage: FC<MainPageProps> = ({ countdownProps }) => {

// 	const updateCrosswordTimer = (timer: number) => {
// 		countdownProps.onCounterUpdate(timer);
// 	}

// 	return (
// 		<>
// 				<div
// 					data-theme="night"
// 					className="flex flex-col items-center relative min-h-[100vh] w-[100vw]"
// 				>
// 						<div className="flex flex-col items-center mt-24 w-full">
// 							<CountDown
// 								onCounterUpdate={timer => updateCrosswordTimer(timer)}
// 								currentTimer={countdownProps.currentTimer}
// 								initialTimer={countdownProps.initialTimer}
// 							/>
// 							<button
// 								className="btn btn-secondary absolute left-15 top-3"
// 								onClick={() => clearLocalStorage()}
// 							>
// 								Clear Localstorage
// 							</button>
// 							<button
// 								className="btn btn-secondary absolute left-5 top-3"
// 								// onClick={() => crosswordFetcher()}
// 							>
// 								Get Data
// 							</button>
// 							<button
// 								className="btn btn-secondary absolute left-5 top-15"
// 								// onClick={() => crosswordFetcher()}
// 							>
// 								Seed Data Base
// 							</button>
// 							<h1 className="text-secondary text-6xl font-semibold mb-20">
// 								Sørens Store Krydsord
// 							</h1>
// 							<div className="justify-center text-lg text-secondary md:w-full w-[900px] h-[500px] max-w-[1000px] max-h-[1000px] ">
// 								<Crossword data={crosswordToPass} />
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}
// 			)
// 		</>
// 	);
// };

// export default MainPage;

import React, { FC } from 'react';

type NameProps = {};

const Name: FC<NameProps> = ({}) => {
	return <div>Name</div>;
};

export default Name;

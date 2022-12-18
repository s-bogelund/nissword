import React, { FC, useEffect, useState } from 'react';

type AlertProps = {};

const alertPhrases = [
	'Damn, det var sgu rigtigt',
	'Jeg er så stolt af dig',
	'Godt nok flot min ven',
	'Det var da en god gætter',
	'Du ved da også alting altså',
	'Aah, der må have været lidt held inden over der',
];

const Alert: FC<AlertProps> = ({}) => {
	const [phrases] = useState(alertPhrases);
	const [isVisible, setIsVisible] = useState(true);

	return (
		<>
			{isVisible && (
				<div className="alert alert-success shadow-lg w-fit absolute bottom-28">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>
							{phrases[Math.round(Math.random() * (alertPhrases.length - 1))]}
						</span>
					</div>
				</div>
			)}
		</>
	);
};

export default Alert;

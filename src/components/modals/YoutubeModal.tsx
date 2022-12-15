import React, { FC, useEffect, useRef, useState } from 'react';
import Modal, { Dialog } from '../Modal';

type Props = {
	showYoutube: boolean;
} & Dialog;

const YoutTubeModal: FC<Dialog> = ({ className, isOpen, onClose, onClick }) => {
	const [showYoutube, setShowYoutube] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	// 5 seconds delay on mount
	useEffect(() => {
		const timer = setTimeout(() => {
			setButtonDisabled(false);
		}, 4000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Modal
			className={`!h-fit !w-fit  !p-0 !m-0 !border-none !shadow-none ${className}`}
			isOpen={isOpen}
			onClose={onClose}
		>
			{showYoutube && (
				<iframe
					width="960"
					height="815"
					src="https://www.youtube.com/embed/dQw4w9WgXcQ?&autoplay=1"
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				></iframe>
			)}
			{!showYoutube && (
				<div className="flex flex-col items-center justify-center w-fit h-fit gap-6 p-4">
					<h1 className="text-2xl font-bold text-success">
						HALLELUJA DA FOR POKKER!!
					</h1>
					<p>
						Damn son du gjorde det sgu! Jeg troede virkelig ikke du ville nå
						det!
					</p>
					<p>Good job, you sweet Sommer child!</p>
					<p>Så find da ud af, hvor din gave er :)</p>
					<div className="flex mt-3 w-full justify-end">
						<button
							className="btn btn-secondary px-10"
							onClick={() => setShowYoutube(true)}
							disabled={showYoutube}
						>
							Move on
						</button>
					</div>
				</div>
			)}
		</Modal>
	);
};

export default YoutTubeModal;

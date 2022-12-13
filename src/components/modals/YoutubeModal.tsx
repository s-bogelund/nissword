import React, { FC, useEffect, useRef, useState } from 'react';
import Modal, { Dialog } from '../Modal';

type Props = {
	showYoutube: boolean;
} & Dialog;

const YoutTubeModal: FC<Dialog> = ({ className, isOpen, onClose, onClick }) => {
	const modalRef = useRef<HTMLIFrameElement>(null);
	const [showYoutube, setShowYoutube] = useState(false);
	useEffect(() => {
		if (modalRef.current) {
			console.log('iframeRef', modalRef.current);

			modalRef.current?.contentWindow?.focus();

			modalRef.current?.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'm',
				})
			);
		}
	}, [isOpen, modalRef]);

	return (
		<Modal
			className={`!h-fit !w-fit !bg-transparent !p-0 !m-0 !border-none !shadow-none ${className}`}
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
				<div className="h-[815px] w-[960px] bg-slate-700 flex flex-col justify-center items-center rounded-lg">
					<div className=" flex flex-col w-[70%] items-center">
						<div className="text-pink-700 text-6xl font-semibold mb-10 w-full">
							SÅDAN MAND!
						</div>
						<div className="flex justify-center items-center text-pink-700 text-3xl font-semibold mb-10 w-full">
							<p>
								Så vandt du fandme alligevel. Det troede jeg ikke du ville nå
								tbh
							</p>
						</div>
						<button
							className="btn w-40 self-end mr-48"
							onClick={() => setShowYoutube(true)}
						>
							Gå videre
						</button>
					</div>
				</div>
			)}
		</Modal>
	);
};

export default YoutTubeModal;

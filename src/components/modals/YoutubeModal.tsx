import React, { FC, useEffect, useRef } from 'react';
import Modal, { Dialog } from '../Modal';

const YoutTubeModal: FC<Dialog> = ({ className, isOpen, onClose, onClick }) => {
	const modalRef = useRef<HTMLIFrameElement>(null);

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

	const handleClick = () => {
		console.log('iframeRef', modalRef.current);
	};

	return (
		<Modal
			className={`!h-fit !w-fit !bg-transparent !p-0 !m-0 !border-none !shadow-none ${className}`}
			isOpen={isOpen}
			onClose={onClose}
			onClick={() => handleClick()}
		>
			<iframe
				ref={modalRef}
				width="960"
				height="815"
				src="https://www.youtube.com/embed/dQw4w9WgXcQ?&autoplay=1"
				// src="https://www.youtube.com/embed/dQw4w9WgXcQ?&autoplay=1"
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
			></iframe>
		</Modal>
	);
};

export default YoutTubeModal;

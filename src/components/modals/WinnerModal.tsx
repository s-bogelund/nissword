import React, { FC } from 'react';
import Modal, { Dialog } from '../Modal';

const WinnerModal: FC<Dialog> = ({ className, isOpen, onClose }) => {
	return (
		<Modal
			className={`!h-fit !w-fit !bg-transparent !p-0 !m-0 !border-none !shadow-none ${className}`}
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="flex flex-col items-center justify-center w-full h-full">
				Hold da helt ferie, hvor du dog kan lave sådan en krydsord!
			</div>
		</Modal>
	);
};

export default WinnerModal;

import React, { FC } from 'react';
import Modal, { Dialog } from '../Modal';

const WinnerModal: FC<Dialog> = ({ className, isOpen, onClose }) => {
	return (
		<Modal
			className={`!h-fit !w-fit !p-4 !m-0 !border-none !shadow-none ${className}`}
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="flex flex-col items-center justify-center w-[40vw] h-[35vw]">
				Hold da helt ferie, hvor du dog kan lave sådan en krydsord!
			</div>
		</Modal>
	);
};

export default WinnerModal;

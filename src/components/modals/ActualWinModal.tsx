import React, { FC } from 'react';
import Modal, { Dialog } from '../Modal';

const WinnerModal: FC<Dialog> = ({ className, isOpen, onClose }) => {
	return (
		<Modal
			className={`!h-fit !w-fit !p-4 !m-0 !border-none !shadow-none ${className}`}
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="flex flex-col items-center justify-center w-fit h-fit gap-6 p-4">
				<h1 className="text-2xl font-bold text-success">
					HALLELUJA DA FOR POKKER!!
				</h1>
				<p>
					Damn son du gjorde det sgu! Jeg troede virkelig ikke du ville nå det!
				</p>
				<p>Good job, you sweet Sommer child!</p>
				<p>Så find da ud af, hvor din gave er :)</p>
				<div className="flex mt-3 w-full justify-end">
					<button className="btn btn-secondary px-10" onClick={onClose}>
						Move on
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default WinnerModal;

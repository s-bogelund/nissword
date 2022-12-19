import React, { FC } from 'react';
import Modal, { Dialog } from '../Modal';

type FakeLossProps = {};

const FakeLossModal: FC<Dialog> = ({ className, isOpen, onClose }) => {
	return (
		<Modal
			className={`!h-fit !w-fit !p-4 !m-0 !border-none !shadow-none ${className}`}
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="flex flex-col items-center justify-center text-center w-[30vw] h-fit p-10 gap-4">
				<p className="text-xl mb-4">FUCKING ØV</p>
				<img src="/saddest-pepe.png"></img>
				<p className="text-base">Shit, det nåede du sgu ikke hva?</p>
				<p className="text-base">
					Det er jo lidt kedeligt, hvis du ikke kan få lov at komme videre, så
					du kan evt. bare gå ind i localStorage og påstå at du vandt og så
					reload siden :)
				</p>
				<p className="text-base">
					Du kan jo bare gøre det færdigt senere, hvis du har lyst.
				</p>
			</div>
		</Modal>
	);
};

export default FakeLossModal;

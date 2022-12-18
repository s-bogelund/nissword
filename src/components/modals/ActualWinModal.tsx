import React, { FC, useMemo, useState } from 'react';
import Modal, { Dialog } from '../Modal';

const ActualWinModal: FC<Dialog> = ({ className, isOpen, onClose }) => {
	const [showFirstPage, setShowFirstPage] = useState(true);
	const [showCloseButton, setShowCloseButton] = useState(false);
	const handleShowCloseButton = () => {
		if (showFirstPage) {
			return false;
		} else {
			setTimeout(() => {
				return true;
			}, 5000);
		}
	};

	const updateCloseButton = useMemo(() => {
		if (showFirstPage) {
			return false;
		} else {
			setTimeout(() => {
				setShowCloseButton(true);
			}, 2000);
			// return true;
		}
	}, [showFirstPage]);

	const pageHandler = () => {
		if (showFirstPage) {
			return (
				<>
					<h1 className="text-2xl font-bold text-success">
						Ey du gjorde det ægte denne gang, sygt nok!
					</h1>
					<p className="text-xl ">
						Nu er det tid til at få det sidste hint. Lover det ikke er en rick
						roll igen ;)
					</p>

					<div className="flex mt-3 w-full justify-end">
						<button
							className="btn btn-secondary px-10"
							onClick={() => setShowFirstPage(false)}
						>
							Move on
						</button>
					</div>
				</>
			);
		} else {
			return (
				<>
					<h1 className="text-2xl font-bold text-success">Epic last hint</h1>
					<p className="text-xl ">
						Man må ikke bare tage en docking station med hjem, men måske kan man
						få lov at tage noget andet?
					</p>
				</>
			);
		}
	};

	return (
		<Modal
			className={`!h-fit !w-fit !p-4 !m-0 !border-none !shadow-none ${className}`}
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="flex flex-col items-center justify-center w-[42rem] h-fit gap-6 p-4 relative">
				{showCloseButton && (
					<div
						onClick={onClose}
						className="absolute flex justify-center items-center h-6 w-6 bg-current right-1 top-1 rounded-full cursor-pointer"
					>
						<p className="text-black">x</p>
					</div>
				)}
				{pageHandler()}
			</div>
		</Modal>
	);
};

export default ActualWinModal;

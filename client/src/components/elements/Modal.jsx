// https://dev.to/link2twenty/react-using-portals-to-make-a-modal-2kdf
import { useState, useEffect, useRef } from 'react';

import { Portal } from './Portal';
import './css/Modal.css'

export function Modal({ children, open, onClose, locked }) {
	// set up active state
	const [active, setActive] = useState(false);
	// get spread props out variables
	// const { open, onClose, locked } = props;
	// Make a reference to the backdrop
	const backdrop = useRef(null);

	useEffect(() => {
		// get dom element from backdrop ref
		const { current } = backdrop;
		// when transition ends set active state to match open prop
		const transitionEnd = () => setActive(open);
		// when esc key press close modal unless locked
		const keyHandler = (e) => !locked && [27].indexOf(e.which) >= 0 && onClose();
		// when clicking the backdrop close modal unless locked
		const clickHandler = (e) => !locked && e.target === current && onClose();

		// if the backdrop exists set up listeners
		if (current) {
			current.addEventListener('transitionend', transitionEnd);
			current.addEventListener('click', clickHandler);
			window.addEventListener('keyup', keyHandler);
		}

		// if open props is true add inert to #root
		// and set active state to true
		if (open) {
			window.setTimeout(() => {
				document.activeElement.blur();
				setActive(open);
				document.querySelector('#root').setAttribute('inert', 'true');
			}, 10);
		}

		// on unmount remove listeners
		return () => {
			if (current) {
				current.removeEventListener('transitionend', transitionEnd);
				current.removeEventListener('click', clickHandler);
			}

			document.querySelector('#root').removeAttribute('inert');
			window.removeEventListener('keyup', keyHandler);
		};
	}, [open, locked, onClose]);

	return (
		<>
			{(open || active) && (
				<Portal className="modal-portal">
					<div ref={backdrop} className={`backdrop ${active && open && 'active'}`}>
						<div className="modal-content contents">{children}</div>
					</div>
				</Portal>
			)}
		</>
	);
}

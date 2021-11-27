// https://dev.to/link2twenty/react-using-portals-to-make-a-modal-2kdf
import { useState, useEffect, useRef } from 'react';

import { Portal } from './Portal';

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
				<Portal
					css={css`
						.contents {
							position: relative;
							z-index: 50;
							padding: 20px;
							box-sizing: border-box;
							min-height: 50px;
							min-width: 50px;
							max-height: 80%;
							max-width: 80%;
							box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
							background-color: white;
							border-radius: 2px;
						}

						.backdrop {
							position: fixed;
							z-index: 49;
							top: 0;
							right: 0;
							bottom: 0;
							left: 0;
							background-color: rgba(51, 51, 51, 0.3);
							backdrop-filter: blur(3px);
							opacity: 0;
							transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
							transition-delay: 200ms;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.backdrop .modal-content {
							transform: translateY(100px);
							transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
							opacity: 0;
						}

						.backdrop.active {
							transition-duration: 250ms;
							transition-delay: 0ms;
							opacity: 1;
						}
						.backdrop.active .modal-content {
							transform: translateY(0);
							opacity: 1;
							transition-delay: 150ms;
							transition-duration: 350ms;
						}
					`}
					className="modal-portal"
				>
					<div ref={backdrop} className={`backdrop ${active && open && 'active'}`}>
						<div className="modal-content contents">{children}</div>
					</div>
				</Portal>
			)}
		</>
	);
}

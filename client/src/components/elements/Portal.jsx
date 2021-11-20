// https://dev.to/link2twenty/react-using-portals-to-make-a-modal-2kdf
import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

export function Portal({ children, parent, className }) {
	// Create div to contain everything
	const el = useMemo(() => document.createElement('div'), []);

	useEffect(() => {
		// work out target in the DOM based on parent prop
		const target = parent && parent.appendChild ? parent : document.body;
		const classList = ['modal-container'];
		// add className if exists
		if (className) className.split(' ').forEach((cl) => classList.push(cl));
		// add classes to el
		classList.forEach((cl) => el.classList.add(cl));
		// append el to target
		target.appendChild(el);

		return () => {
			// remove el from target on unmount
			target.removeChild(el);
		};
	}, [el, parent, className]);

	return createPortal(children, el);
}

import './css/Card.css';

export function Card({ header, text, children }) {
	return (
		<div className="card">
			<header className="card-header">{header}</header>
			<div className="card-text">{text}</div>
			<div className="card-content">{children}</div>
		</div>
	);
}

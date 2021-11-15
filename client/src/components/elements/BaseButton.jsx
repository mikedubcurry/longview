import './css/BaseButton.css';

export function BaseButton({ text, clickHandler, styleToken }) {
	return (
		<button  className="base-button" onClick={clickHandler}>
      <span className="shadow"></span>
      <span style={styleToken ? styleToken : {}} className="edge"></span>
      <span style={styleToken ? styleToken : {}} className="front">{text}</span>
		</button>
	);
}

import { LinkButton } from './LinkButton';

export function AuthButton({ text, clickHandler }) {
	return <LinkButton styleToken={{ "--btn-color": '#fbff00', "--btn-color-edge": '#838500', '--btn-color-dark': '#2e2f00' }} clickHandler={clickHandler} text={text} />;
}

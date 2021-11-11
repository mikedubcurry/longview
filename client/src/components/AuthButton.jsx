import { BaseButton } from './BaseButton';

export function AuthButton({ text, clickHandler }) {
	return <BaseButton styleToken={{ "--btn-color": '#fbff00', "--btn-color-edge": '#838500', '--btn-color-dark': '#2e2f00' }} clickHandler={clickHandler} text={text} />;
}

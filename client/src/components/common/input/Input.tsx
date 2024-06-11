import { ChangeEventHandler, MouseEvent, useState } from 'react';
import { HandleChangeText } from '../../../interfaces/globa';
import _color from '../../../styles/main/global/_color';
import Svg from '../icons/Svg';
import { SvgType } from '../icons/svgType';

export interface InputProps {
	type?: string;
	id: string;
	placeholder: string;
	value: string | number;
	handleOnChange: HandleChangeText;
	name: string;

	disabled?: boolean;
	className?: string;
	errorMessage: string | undefined;
	svgLeft?: SvgType;
	svgRight?: SvgType;
	other_attributes?: ChangeEventHandler<HTMLButtonElement>;
}

function Input({
	id,
	className,
	svgLeft,
	svgRight,
	errorMessage,
	handleOnChange,
	name,
	placeholder,
	value,
	disabled,
	other_attributes,
	type,
}: InputProps) {
	const [toggle, setToggle] = useState(false);

	const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setToggle(data => (data ? false : true));
	};

	return (
		<div className={`input input__container${className && `--${className}`}`}>
			<label htmlFor={`input__${id}`}>{placeholder}</label>

			<div
				className={`${errorMessage ? 'input_error' : 'input_brand'} input__content${className && `--${className}`}`}
			>
				<span
					style={{
						border: `1px solid ${
							errorMessage
								? _color.error.error_6
								: value.toString()?.length === 0
									? _color.font.font_accent
									: _color.success.success_6
						}`,
					}}
				>
					<span className={`input__svg-left${className && `--${className}`}`}>
						{svgLeft &&
							Svg({
								type: svgLeft,
								height: 16,
								width: 16,
								color: errorMessage ? _color.error.error_6 : '#848FAC',
							})}
					</span>
					<input
						id={`input__${id}`}
						type={type !== 'password' ? type : toggle ? 'text' : type}
						placeholder={placeholder}
						value={value}
						onChange={event => handleOnChange(event)}
						name={name}
						disabled={disabled}
						{...other_attributes}
					/>
					<span
						className={`input__svgTwo${className && `--${className}`}`}
						onClick={handleOnClick}
					>
						{svgRight &&
							Svg({
								type: svgRight,
								height: 16,
								width: 16,
								color: errorMessage ? _color.error.error_6 : '#848FAC',
							})}
					</span>
				</span>
			</div>

			<div className={`input__error${className && `--${className}`}`}>
				<div>
					<div className={`input__message${className && `--${className}`}`}>
						<span>{errorMessage}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Input;

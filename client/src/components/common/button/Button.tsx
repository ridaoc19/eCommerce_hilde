import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import { HandleClick } from '../../../interfaces/globa';
import Svg from '../icons/Svg';
import { SvgType } from '../icons/svgType';
import { ButtonType } from './button.type';
import _color from '../../../styles/main/global/_color';

export interface ButtonProps {
	id: string;
	type: ButtonType;
	text: string | ReactNode;
	handleClick: HandleClick;

	svgRight?: SvgType;
	svgLeft?: SvgType;
	other_attributes?: ButtonHTMLAttributes<HTMLButtonElement>;
	disabled?: boolean;
	value?: string | number;
	className?: string;
}

const Button: React.FC<ButtonProps> = (params: ButtonProps) => {
	const {
		id,
		type,
		handleClick,
		text,
		value,
		disabled,
		className,
		other_attributes,
		svgLeft,
		svgRight,
	} = params;
	return (
		<button
			id={id}
			className={`button button_${type} ${className}`}
			onClick={handleClick}
			value={value}
			disabled={disabled}
			aria-label={`Click para ${id}`}
			{...other_attributes}
		>
			{!!svgLeft && (
				<span className='button__svg-left'>
					{Svg({
						type: svgLeft,
						height: 16,
						width: 16,
						color: [
							ButtonType.Error,
							ButtonType.Success,
							ButtonType.Warning,
							ButtonType.Information,
						].includes(type)
							? _color.font.font_light
							: undefined,
					})}
				</span>
			)}
			{!!text && (
				<span className='button__text-container'>
					<div>{text}</div>
				</span>
			)}
			{!!svgRight && (
				<span className='button__svg-right'>
					{Svg({
						type: svgRight,
						height: 16,
						width: 16,
						color: [
							ButtonType.Error,
							ButtonType.Success,
							ButtonType.Warning,
							ButtonType.Information,
						].includes(type)
							? _color.font.font_light
							: undefined,
					})}
				</span>
			)}
		</button>
	);
};

export default Button;

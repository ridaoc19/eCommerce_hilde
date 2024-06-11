import React from 'react';
import Button from '../../components/common/button/Button';
import Svg from '../../components/common/icons/Svg';
import { ButtonType } from '../../components/common/button/button.type';
import { SvgType } from '../../components/common/icons/svgType';

interface SwitchProps {
	handleClick: () => void;
	language: string;
}

const Switch: React.FC<SwitchProps> = ({ handleClick, language }) => {
	return (
		<label className='switch'>
			<Button
				id='spanish'
				type={language === 'es' ? ButtonType.Dark : ButtonType.Light}
				handleClick={handleClick}
				text={Svg({ type: SvgType.Spanish })}
			/>
			<Button
				id='english'
				type={language === 'en' ? ButtonType.Dark : ButtonType.Light}
				handleClick={handleClick}
				text={Svg({ type: SvgType.English })}
			/>
		</label>
	);
};

export default Switch;

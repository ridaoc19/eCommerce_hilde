import { ChangeEvent, MouseEvent } from 'react';

export type HandleClick = (event: MouseEvent<HTMLButtonElement>) => void;
export type HandleChangeText = (event: ChangeEvent<HTMLInputElement>) => void;
export type HandleChangeTextArea = (
	event: React.ChangeEvent<HTMLTextAreaElement>
) => void;
export type handleSelectChange = (
	event: ChangeEvent<HTMLSelectElement>
) => void;
export type HandleChangeTextSelect = (
	data:
		| React.ChangeEvent<HTMLInputElement>
		| React.ChangeEvent<HTMLSelectElement>
) => void;
export type handleOnKeyDown = (
	event: React.KeyboardEvent<HTMLInputElement>
) => void;

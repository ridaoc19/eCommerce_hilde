import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { SvgType } from '../icons/svgType';
import Button, { ButtonProps } from './Button';
import { ButtonType } from './button.type';

const defaultProps: ButtonProps = {
	id: 'test-button',
	type: ButtonType.Dark,
	text: 'Click Me',
	handleClick: vi.fn(),
	svgLeft: SvgType.ArrowBottom,
	disabled: false,
};

// *TODO AGRUPAR
describe('Button', () => {
	beforeEach(() => {
		cleanup(); // Limpia el estado antes de cada prueba
	});

	test('render component', () => {
		// Renderiza el componente Button
		render(<Button {...defaultProps} />);
		const button = screen.getByRole('button');
		expect(button).toBeDefined();
	});

	test('calls handleClick when clicked', () => {
		const handleClick = vi.fn(); // Crea una función simulada para handleClick
		render(<Button {...defaultProps} handleClick={handleClick} />);
		const button = screen.getByRole('button');
		fireEvent.click(button); // Simula un clic en el botón
		expect(handleClick).toHaveBeenCalledTimes(1); // Verifica que handleClick se llame una vez
	});

	test('renders with svgLeft', () => {
		// Renderiza el componente Button con un SVG a la izquierda
		const { container } = render(
			<Button {...defaultProps} svgLeft={SvgType.ArrowBottom} />
		);
		const svgContainer = container.querySelector('.button__svg-left');
		expect(svgContainer).toBeInTheDocument();
		// expect(screen.getByRole('img')).toBeInTheDocument(); // Verifica que el SVG esté presente en el documento
	});

	test('exist className "button"', () => {
		// Verifica si tiene la clase button
		render(<Button {...defaultProps} disabled={false} />);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('button');
	});

	test('button enabled', () => {
		// Renderiza el componente Button con el botón habilitado
		render(<Button {...defaultProps} disabled={false} />);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('button');
		expect(button).not.toBeDisabled();
	});

	test('disable button', () => {
		// Renderiza el componente Button con el botón deshabilitado
		render(<Button {...defaultProps} disabled={true} />);
		const button = screen.getByRole('button');
		// expect(button).not.toBeDisabled();
		// fireEvent.click(button);
		expect(button).toBeDisabled();
	});

	test('exist other_attributes', () => {
		// verifica que otros atributos estén presentes
		render(
			<Button {...defaultProps} other_attributes={{ name: 'test-name' }} />
		);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('name', 'test-name');
	});
});

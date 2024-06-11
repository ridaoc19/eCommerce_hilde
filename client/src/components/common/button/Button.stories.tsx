import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, userEvent, within } from '@storybook/test';
import { Controls, Primary } from '@storybook/blocks';

import Button from './Button';
import { ButtonType } from './button.type';
import { SvgType } from '../icons/svgType';
import useLanguages from '../../../hooks/useLanguages/useLanguages';

const meta: Meta<typeof Button> = {
	title: 'components/common/Buttons',
	component: Button,
	tags: ['autodocs'],
	parameters: {
		componentSubtitle: 'Botón Global',
		docs: {
			page: () => <ButtonDocumentation />,
		},
	},
	argTypes: {
		id: {
			description: 'ID único del botón en el DOM.',
			control: { type: 'text' },
		},
		className: {
			description: 'Clase CSS adicional para personalizar el estilo del botón.',
			control: { type: 'text' },
		},
		text: {
			description: 'Texto o componente React a mostrar dentro del botón.',
			control: { type: 'text' },
		},
		disabled: {
			description: 'Deshabilita el botón si está establecido en `true`.',
			control: { type: 'boolean' },
		},
		handleClick: {
			description: 'Función que se ejecuta cuando se hace clic en el botón.',
			control: {},
		},
		type: {
			description: 'Estilo visual del botón.',
			control: {
				type: 'select',
			},
			options: Object.values(ButtonType),
		},
		value: {
			description: 'Valor asociado al botón.',
			control: { type: 'text' },
		},
		svgRight: {
			description: 'Tipo de icono SVG que se mostrará a la derecha del texto.',
			control: { type: 'select' },
			options: Object.values(SvgType),
		},
		svgLeft: {
			description:
				'Tipo de icono SVG que se mostrará a la izquierda del texto.',
			control: { type: 'select' },
			options: Object.values(SvgType),
		},
		other_attributes: {
			description:
				'Otras propiedades HTML estándar que se pueden aplicar al botón.',
			control: { type: 'object' },
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
	args: {
		id: 'button__login',
		text: 'Inicio de Sesión',
		type: ButtonType.Dark,
		handleClick: fn(),
		svgRight: SvgType.Logo,
		svgLeft: SvgType.ArrowBottom,
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const buttonElement = canvas.getByText('Inicio de Sesión');

		expect(buttonElement).toBeInTheDocument();
		fireEvent.click(buttonElement);
		expect(args.handleClick).toHaveBeenCalledTimes(1);

		const button = canvas.getByRole('button');
		await userEvent.type(button, 'new text');
	},
};

const ButtonDocumentation = () => {
	const { Switch, language } = useLanguages();

	return (
		<>
			{Switch}
			{language === 'en' ? (
				<div>
					<h1>Button</h1>
					<p>
						The <code>Button</code> component is used to create buttons in the
						application.
					</p>

					<h3>Props</h3>
					<ul>
						<li>
							<strong>id</strong>: Unique ID of the button in the DOM.
						</li>
						<li>
							<strong>className</strong>: Additional CSS class to customize the
							button's style.
						</li>
						<li>
							<strong>text</strong>: Text or React component to display inside
							the button.
						</li>
						<li>
							<strong>disabled</strong>: Disables the button if set to{' '}
							<code>true</code>.
						</li>
						<li>
							<strong>handleClick</strong>: Function to execute when the button
							is clicked.
						</li>
						<li>
							<strong>type</strong>: Visual style of the button.
						</li>
						<li>
							<strong>value</strong>: Value associated with the button.
						</li>
						<li>
							<strong>svgRight</strong>: Type of SVG icon to display on the
							right side of the button.
						</li>
						<li>
							<strong>svgLeft</strong>: Type of SVG icon to display on the left
							side of the button.
						</li>
						<li>
							<strong>other_attributes</strong>: Other standard HTML properties
							that can be applied to the button.
						</li>
					</ul>

					<h3>Example Usage</h3>
					<pre>
						<code>
							<Primary />
							<Controls />
						</code>
					</pre>

					<h3>Additional Notes</h3>
					<ul>
						<li>
							The <code>Button</code> component allows creating buttons with
							various styles and functionalities.
						</li>
						<li>
							The default style of the button is set to <code>Dark</code>.
						</li>
					</ul>

					<h3>Testing</h3>
					<p>
						To ensure the quality and proper functioning of the{' '}
						<code>Button</code> component, the following tests have been
						included:
					</p>
					<ul>
						<li>
							<strong>Button Rendering</strong>: Verifies that the button is
							rendered correctly with the provided text or component.
						</li>
						<li>
							<strong>Button Functionality</strong>: Simulates a click on the
							button and checks that the <code>handleClick</code> function is
							called correctly.
						</li>
						<li>
							<strong>User Input</strong>: Simulates text input in the button
							and verifies that it is processed correctly.
						</li>
					</ul>
					<p>
						These tests ensure that the <code>Button</code> component is
						rendered properly and functions correctly in different scenarios.
						They can be verified in the <code>Interactions</code> section.
					</p>
				</div>
			) : (
				<div>
					<h1>Button</h1>
					<p>
						El componente <code>Button</code> se utiliza para crear botones en
						la aplicación.
					</p>

					<h3>Props</h3>
					<ul>
						<li>
							<strong>id</strong>: ID único del botón en el DOM.
						</li>
						<li>
							<strong>className</strong>: Clase CSS adicional para personalizar
							el estilo del botón.
						</li>
						<li>
							<strong>text</strong>: Texto o componente React para mostrar
							dentro del botón.
						</li>
						<li>
							<strong>disabled</strong>: Deshabilita el botón si está
							establecido en <code>true</code>.
						</li>
						<li>
							<strong>handleClick</strong>: Función para ejecutar cuando se hace
							clic en el botón.
						</li>
						<li>
							<strong>type</strong>: Estilo visual del botón.
						</li>
						<li>
							<strong>value</strong>: Valor asociado con el botón.
						</li>
						<li>
							<strong>svgRight</strong>: Tipo de ícono SVG para mostrar en el
							lado derecho del botón.
						</li>
						<li>
							<strong>svgLeft</strong>: Tipo de ícono SVG para mostrar en el
							lado izquierdo del botón.
						</li>
						<li>
							<strong>other_attributes</strong>: Otras propiedades HTML estándar
							que se pueden aplicar al botón.
						</li>
					</ul>

					<h3>Ejemplo de Uso</h3>
					<pre>
						<code>
							<Primary />
							<Controls />
						</code>
					</pre>

					<h3>Notas Adicionales</h3>
					<ul>
						<li>
							El componente <code>Button</code> permite crear botones con varios
							estilos y funcionalidades.
						</li>
						<li>
							El estilo predeterminado del botón está establecido en{' '}
							<code>Dark</code>.
						</li>
					</ul>

					<h3>Pruebas</h3>
					<p>
						Para asegurar la calidad y el correcto funcionamiento del componente{' '}
						<code>Button</code>, se han incluido las siguientes pruebas:
					</p>
					<ul>
						<li>
							<strong>Renderización del Botón</strong>: Se verifica que el botón
							se renderiza correctamente con el texto o componente
							proporcionado.
						</li>
						<li>
							<strong>Funcionalidad del Botón</strong>: Se simula un clic en el
							botón y se comprueba que la función <code>handleClick</code> se
							llama correctamente.
						</li>
						<li>
							<strong>Entrada de Usuario</strong>: Se simula la entrada de texto
							en el botón y se verifica que se procese correctamente.
						</li>
					</ul>
					<p>
						Estas pruebas aseguran que el componente <code>Button</code> se
						renderice adecuadamente y funcione correctamente en diferentes
						situaciones. Se pueden verificar en la sección de{' '}
						<code>Interactions</code>.
					</p>
				</div>
			)}
		</>
	);
};

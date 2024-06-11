import { Controls, Primary } from '@storybook/blocks';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, within } from '@storybook/test';

import useLanguages from '../../../hooks/useLanguages/useLanguages';
import { SvgType } from '../icons/svgType';
import Input from './Input';

const meta: Meta<typeof Input> = {
	title: 'components/common/Input',
	component: Input,
	tags: ['autodocs'],
	parameters: {
		componentSubtitle: 'Campo de entrada de texto',
		docs: {
			page: () => <InputDocumentation />,
		},
	},
	argTypes: {
		id: {
			description: 'ID único del campo de entrada en el DOM.',
			control: { type: 'text' },
		},
		name: {
			description: 'Nombre del campo de entrada.',
			control: { type: 'text' },
		},
		placeholder: {
			description: 'Texto de marcador de posición para el campo de entrada.',
			control: { type: 'text' },
		},
		value: {
			description: 'Valor del campo de entrada.',
			control: { type: 'text' },
		},
		errorMessage: {
			description: 'Mensaje de error a mostrar si hay un error.',
			control: { type: 'text' },
		},
		handleOnChange: {
			description: 'Función que se ejecuta cuando el valor del campo cambia.',
			control: {},
		},
		type: {
			description:
				'Tipo de campo de entrada (por ejemplo, "text", "password").',
			control: { type: 'text' },
		},
		disabled: {
			description:
				'Deshabilita el campo de entrada si está establecido en `true`.',
			control: { type: 'boolean' },
		},
		className: {
			description:
				'Clase CSS adicional para personalizar el estilo del campo de entrada.',
			control: { type: 'text' },
		},
		svgLeft: {
			description:
				'Tipo de icono SVG que se mostrará a la izquierda del campo de entrada.',
			control: { type: 'select' },
			options: Object.values(SvgType),
		},
		svgRight: {
			description:
				'Tipo de icono SVG que se mostrará a la derecha del campo de entrada.',
			control: { type: 'select' },
			options: Object.values(SvgType),
		},
		other_attributes: {
			description:
				'Otras propiedades HTML estándar que se pueden aplicar al campo de entrada.',
			control: { type: 'object' },
		},
	},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inputs: Story = {
	args: {
		id: 'input__login-username',
		name: 'username',
		placeholder: 'Usuario',
		value: '',
		errorMessage: '',
		handleOnChange: fn(),
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const inputElement = canvas.getByPlaceholderText('Usuario');

		expect(inputElement).toBeInTheDocument();
		fireEvent.change(inputElement, { target: { value: 'new user' } });
		expect(args.handleOnChange).toHaveBeenCalledTimes(1);
		expect(inputElement).toHaveValue('new user');
	},
};

const InputDocumentation = () => {
	const { Switch, language } = useLanguages();

	return (
		<>
			{Switch}
			{language === 'en' ? (
				<div>
					<h1>Input</h1>
					<p>
						The <code>Input</code> component is used to create text input fields
						in the application.
					</p>

					<h3>Props</h3>
					<ul>
						<li>
							<strong>id</strong>: Unique ID of the input field in the DOM.
						</li>
						<li>
							<strong>name</strong>: Name of the input field.
						</li>
						<li>
							<strong>placeholder</strong>: Placeholder text for the input
							field.
						</li>
						<li>
							<strong>value</strong>: Value of the input field.
						</li>
						<li>
							<strong>errorMessage</strong>: Error message to display if there
							is an error.
						</li>
						<li>
							<strong>handleOnChange</strong>: Function to execute when the
							input field value changes.
						</li>
						<li>
							<strong>type</strong>: Type of input field (e.g., "text",
							"password").
						</li>
						<li>
							<strong>disabled</strong>: Disables the input field if set to{' '}
							<code>true</code>.
						</li>
						<li>
							<strong>className</strong>: Additional CSS class to customize the
							input field style.
						</li>
						<li>
							<strong>svgLeft</strong>: Type of SVG icon to display on the left
							side of the input field.
						</li>
						<li>
							<strong>svgRight</strong>: Type of SVG icon to display on the
							right side of the input field.
						</li>
						<li>
							<strong>other_attributes</strong>: Other standard HTML properties
							that can be applied to the input field.
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
							The <code>Input</code> component allows creating text input fields
							with various styles and functionalities.
						</li>
					</ul>

					<h3>Testing</h3>
					<p>
						To ensure the quality and proper functioning of the{' '}
						<code>Input</code> component, the following tests have been
						included:
					</p>
					<ul>
						<li>
							<strong>Input Rendering</strong>: Verifies that the input field is
							rendered correctly with the provided placeholder.
						</li>
						<li>
							<strong>Input Functionality</strong>: Simulates a change in the
							input field and checks that the <code>handleOnChange</code>{' '}
							function is called correctly.
						</li>
					</ul>
					<p>
						These tests ensure that the <code>Input</code> component is rendered
						properly and functions correctly in different scenarios. They can be
						verified in the <code>Interactions</code> section.
					</p>
				</div>
			) : (
				<div>
					<h1>Input</h1>
					<p>
						El componente <code>Input</code> se utiliza para crear campos de
						entrada de texto en la aplicación.
					</p>

					<h3>Props</h3>
					<ul>
						<li>
							<strong>id</strong>: ID único del campo de entrada en el DOM.
						</li>
						<li>
							<strong>name</strong>: Nombre del campo de entrada.
						</li>
						<li>
							<strong>placeholder</strong>: Texto de marcador de posición para
							el campo de entrada.
						</li>
						<li>
							<strong>value</strong>: Valor del campo de entrada.
						</li>
						<li>
							<strong>errorMessage</strong>: Mensaje de error a mostrar si hay
							un error.
						</li>
						<li>
							<strong>handleOnChange</strong>: Función para ejecutar cuando el
							valor del campo cambia.
						</li>
						<li>
							<strong>type</strong>: Tipo de campo de entrada (por ejemplo,
							"text", "password").
						</li>
						<li>
							<strong>disabled</strong>: Deshabilita el campo de entrada si está
							establecido en <code>true</code>.
						</li>
						<li>
							<strong>className</strong>: Clase CSS adicional para personalizar
							el estilo del campo de entrada.
						</li>
						<li>
							<strong>svgLeft</strong>: Tipo de icono SVG que se mostrará a la
							izquierda del campo de entrada.
						</li>
						<li>
							<strong>svgRight</strong>: Tipo de icono SVG que se mostrará a la
							derecha del campo de entrada.
						</li>
						<li>
							<strong>other_attributes</strong>: Otras propiedades HTML estándar
							que se pueden aplicar al campo de entrada.
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
							El componente <code>Input</code> permite crear campos de entrada
							de texto con varios estilos y funcionalidades.
						</li>
					</ul>

					<h3>Pruebas</h3>
					<p>
						Para asegurar la calidad y el correcto funcionamiento del componente{' '}
						<code>Input</code>, se han incluido las siguientes pruebas:
						<ul>
							<li>
								<strong>Renderización del Componente</strong>: Verifica que el
								campo de entrada se renderiza correctamente con el marcador de
								posición proporcionado.
							</li>
							<li>
								<strong>Funcionalidad del Componente</strong>: Simula un cambio
								en el campo de entrada y comprueba que la función{' '}
								<code>handleOnChange</code> se llama correctamente.
							</li>
						</ul>
					</p>
					<p>
						Estas pruebas aseguran que el componente <code>Input</code> se
						renderice adecuadamente y funcione correctamente en diferentes
						situaciones. Se pueden verificar en la sección de{' '}
						<code>Interactions</code>.
					</p>
				</div>
			)}
		</>
	);
};

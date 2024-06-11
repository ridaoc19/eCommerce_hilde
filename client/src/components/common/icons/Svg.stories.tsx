import { Controls, Primary } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import useLanguages from '../../../hooks/useLanguages/useLanguages';
import _color from '../../../styles/main/global/_color';
import Svg from './Svg';
import { SvgType } from './svgType';

const meta: Meta<typeof Svg> = {
	title: 'components/common/Icons',
	component: Svg,
	parameters: {
		docs: {
			page: () => <SvgDocumentation />,
		},
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			description: 'El tipo de icono',
			control: {
				type: 'select',
			},
			options: Object.values(SvgType),
		},
		height: {
			description: 'selecciona el alto',
			control: { type: 'number' },
		},
		width: {
			description: 'selecciona el ancho',
			control: { type: 'number' },
		},
		color: {
			description: 'Selecciona el color deseado',
			control: {
				type: 'color',
				presetColors: Object.values(_color).reduce((acc: string[], item) => {
					Object.values(item).map(e => {
						return (acc = [...acc, e]);
					});
					return acc;
				}, []),
				disable: false,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Svgs: Story = {
	args: {
		type: SvgType.Logo,
		color: _color.font.font_accent,
		width: 24,
		height: 24,
	},
};

const SvgDocumentation = () => {
	const { Switch, language } = useLanguages();

	return (
		<>
			{Switch}
			{language === 'en' ? (
				<div>
					<h1>Svg</h1>
					<p>
						The <code>Svg</code> component renders SVG icons based on the type
						provided.
					</p>

					<h3>Props</h3>
					<ul>
						<li>
							<strong>type</strong>: The type of SVG icon to render.
						</li>
						<li>
							<strong>width</strong>: The width of the SVG icon. (Optional)
						</li>
						<li>
							<strong>height</strong>: The height of the SVG icon. (Optional)
						</li>
						<li>
							<strong>color</strong>: The color of the SVG icon. (Optional)
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
							The <code>Svg</code> component renders SVG icons based on the type
							provided in the props.
						</li>
						<li>
							The default width and height of the SVG icon are both set to 24
							unless specified otherwise.
						</li>
						<li>
							The default color of the SVG icon is set to the brand font color
							unless specified otherwise.
						</li>
					</ul>
				</div>
			) : (
				<div>
					<h1>Svg</h1>
					<p>
						El componente <code>Svg</code> renderiza íconos SVG basados en el
						tipo proporcionado.
					</p>

					<h3>Props</h3>
					<ul>
						<li>
							<strong>type</strong>: El tipo de ícono SVG que se va a
							renderizar.
						</li>
						<li>
							<strong>width</strong>: El ancho del ícono SVG. (Opcional)
						</li>
						<li>
							<strong>height</strong>: La altura del ícono SVG. (Opcional)
						</li>
						<li>
							<strong>color</strong>: El color del ícono SVG. (Opcional)
						</li>
					</ul>

					<h3>Ejemplo de Uso</h3>
					<pre>
						<Primary />
						<Controls />
					</pre>

					<h3>Notas Adicionales</h3>
					<ul>
						<li>
							El componente <code>Svg</code> renderiza íconos SVG basados en el
							tipo proporcionado en las props.
						</li>
						<li>
							El ancho y la altura predeterminados del ícono SVG están
							establecidos en 24 a menos que se especifique lo contrario.
						</li>
						<li>
							El color predeterminado del ícono SVG está establecido en el color
							de fuente de la marca a menos que se especifique lo contrario.
						</li>
					</ul>
				</div>
			)}
		</>
	);
};

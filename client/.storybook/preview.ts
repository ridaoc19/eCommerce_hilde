import type { Preview } from '@storybook/react';

import '../src/styles/main/main.scss';
import '../src/styles/app/app.scss';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;

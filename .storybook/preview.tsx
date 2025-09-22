import '../src/globals.css';
import type { Preview } from '@storybook/react-vite';
import { Container, Theme, ThemePanel } from '@radix-ui/themes';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo',
		},
	},
	decorators: [
		(Story, { parameters }) => {
			// 👇 Make it configurable by reading from parameters
			const { pageLayout } = parameters;
			switch (pageLayout) {
				case 'dashboard':
					return (
						// Your page layout is probably a little more complex than this ;)
						<Theme style={{ minHeight: 'unset' }}>
							<Container align="center" size="4" p="9">
								<Story />
							</Container>
							<ThemePanel defaultOpen={false} />
						</Theme>
					);
				case 'page':
					return (
						// Your page layout is probably a little more complex than this ;)
						<Theme style={{ minHeight: 'unset' }}>
							<Container align="center" size="1" p="9">
								<Story />
							</Container>
						</Theme>
					);
				case 'page-withThemePanel':
					return (
						// Your page layout is probably a little more complex than this ;)
						<Theme style={{ minHeight: 'unset' }}>
							<Container align="center" size="1" p="9">
								<Story />
							</Container>
							<ThemePanel defaultOpen={false} />
						</Theme>
					);
				case 'page-mobile':
					return (
						<Theme style={{ minHeight: 'unset' }}>
							<Story />
						</Theme>
					);
				default:
					// In the default case, don't apply a layout
					return <Story />;
			}
		},
	],
};

export default preview;

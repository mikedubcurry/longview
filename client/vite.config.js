import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
			babel: {
				plugins: ['@emotion/babel-plugin'],
			},
		}),
	],
	server: {
		port: 3001,
	},
	esbuild: {
		jsxFactory: `jsx`,
		jsxInject: `import {jsx, css} from '@emotion/react'`,
	},
});

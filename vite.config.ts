import { defineConfig } from 'vite';

export default defineConfig({
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},

	server: {
		open: true,
	},
});

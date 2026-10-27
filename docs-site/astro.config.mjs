// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://lemonade-design-system-docs.vercel.app',
	integrations: [
		starlight({
			title: 'Lemonade Design System',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/may-thet-htar-aung/lemonade-design-system' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});

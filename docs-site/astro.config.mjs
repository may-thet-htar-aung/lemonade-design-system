// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import componentPages from './src/generated/components-sidebar.json' with { type: 'json' };

// Every sidebar entry is an explicit slug, so a missing page fails the build
// instead of dropping out of the navigation. Never use autogenerate.
// The per-component entries are written by scripts/generate.mjs.

// https://astro.build/config
export default defineConfig({
	site: 'https://lemonade-design-system-docs.vercel.app',
	integrations: [
		starlight({
			title: 'Lemonade Design System',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/may-thet-htar-aung/lemonade-design-system' }],
			customCss: [
				'@fontsource/manrope/400.css',
				'@fontsource/manrope/500.css',
				'@fontsource/manrope/600.css',
				'@fontsource/manrope/700.css',
				'@fontsource/manrope/800.css',
				'@fontsource/noto-sans-myanmar/400.css',
				'@fontsource/noto-sans-myanmar/600.css',
				'@fontsource/noto-sans-myanmar/700.css',
				'./src/styles/tokens.css',
				'./src/styles/lemonade.css',
			],
			head: [
				{
					// Mirror Starlight's theme onto the Lemonade semantic mode.
					tag: 'script',
					content:
						"(()=>{const r=document.documentElement;const s=()=>{if(r.dataset.theme==='dark')r.setAttribute('data-semantic','dark');else r.removeAttribute('data-semantic');};s();new MutationObserver(s).observe(r,{attributes:true,attributeFilter:['data-theme']});})();",
				},
			],
			sidebar: [
				{
					label: 'Get Started',
					items: [
						{ label: 'Changelog', slug: 'get-started/changelog' },
						{ label: 'Roadmap', slug: 'get-started/roadmap' },
						{ label: 'News', slug: 'get-started/news' },
						{ label: 'Versioning', slug: 'get-started/versioning' },
						{ label: 'Upgrading', slug: 'get-started/upgrading' },
					],
				},
				{ label: 'Designing', items: [{ label: 'Introduction', slug: 'designing/introduction' }] },
				{
					label: 'Developing',
					items: [
						{ label: 'Introduction', slug: 'developing/introduction' },
						{ label: 'React', slug: 'developing/react' },
						{ label: 'React Router', slug: 'developing/react-router' },
					],
				},
				{ label: 'Skills', items: [{ label: 'Knowledge skill', slug: 'skills/knowledge-skill' }] },
				{
					label: 'Core',
					items: [
						{
							label: 'Components',
							items: [{ label: 'All components', slug: 'components' }, ...componentPages],
						},
						{ label: 'Tokens', slug: 'tokens' },
					],
				},
				{ label: 'Styling', items: [{ label: 'Theming', slug: 'styling/theming' }] },
				{
					label: 'Help',
					items: [
						{ label: 'FAQ', slug: 'help/faq' },
						{ label: 'Report a bug', slug: 'help/report-a-bug' },
						{ label: 'Request a feature', slug: 'help/request-a-feature' },
						{ label: 'Contributing', slug: 'help/contributing' },
						{ label: 'Embedding', slug: 'help/embedding' },
					],
				},
			],
		}),
	],
});

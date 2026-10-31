// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import componentGroups from './src/generated/components-sidebar.json' with { type: 'json' };

// Every sidebar entry is an explicit slug, so a missing page fails the build
// instead of dropping out of the navigation. Never use autogenerate.
// The per-component entries are written by scripts/generate.mjs, one sub-group per Category.

// https://astro.build/config
export default defineConfig({
	site: 'https://lemonade-design-system-docs.vercel.app',
	integrations: [
		starlight({
			title: 'Lemonade Design System',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/may-thet-htar-aung/lemonade-design-system' }],
			components: {
				Header: './src/components/Header.astro',
				SiteTitle: './src/components/SiteTitle.astro',
			},
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
				'./src/styles/logo-symbol.css',
				'./src/styles/lemonade.css',
			],
			head: [
				{
					// Mirror Starlight's theme onto the Lemonade semantic mode.
					tag: 'script',
					content:
						"(()=>{const r=document.documentElement;const s=()=>{if(r.dataset.theme==='dark')r.setAttribute('data-semantic','dark');else r.removeAttribute('data-semantic');};s();new MutationObserver(s).observe(r,{attributes:true,attributeFilter:['data-theme']});})();",
				},
				{
					// Load a Storybook embed only once it is visible: Storybook renders blank when
					// its iframe loads inside a hidden tab panel. An iframe marked data-themed (the
					// live preview) follows the site's theme and reloads when it changes. A frame narrower
					// than its iframe scales the iframe down, and one under 600 wide uses its narrow rows when
					// it has them (measure-frames.mjs holds the same number), so nothing scrolls inside it.
					tag: 'script',
					content:
						"document.addEventListener('DOMContentLoaded',()=>{const fs=document.querySelectorAll('iframe[data-src]');if(!fs.length)return;const r=document.documentElement;const url=(f)=>f.dataset.src+(f.hasAttribute('data-themed')&&r.dataset.theme==='dark'?'&globals=semantic:dark':'');const io=new IntersectionObserver((es)=>{for(const e of es){if(e.isIntersecting){e.target.src=url(e.target);io.unobserve(e.target);}}});fs.forEach((f)=>io.observe(f));new MutationObserver(()=>document.querySelectorAll('iframe[data-themed][src]').forEach((f)=>{f.src=url(f);})).observe(r,{attributes:true,attributeFilter:['data-theme']});const fit=(w)=>{const f=w.querySelector('iframe');if(!w.clientWidth||!f)return;if(w.dataset.narrow)w.style.setProperty('--lds-rows',w.clientWidth<600?w.dataset.narrow:w.dataset.rows);w.style.setProperty('--lds-scale',Math.min(1,w.clientWidth/f.offsetWidth));};const ro=new ResizeObserver((es)=>es.forEach((e)=>fit(e.target)));document.querySelectorAll('.lds-frame').forEach((w)=>ro.observe(w));});",
				},
			],
			sidebar: [
				{
					label: 'Get started',
					items: [
						{ label: 'Install', slug: 'get-started/install' },
						{ label: 'Using it', slug: 'get-started/using-it' },
						{ label: 'Versioning', slug: 'get-started/versioning' },
						{ label: 'Upgrading', slug: 'get-started/upgrading' },
					],
				},
				{
					label: 'Foundations',
					items: [
						{ label: 'Colour', slug: 'foundations/colour' },
						{ label: 'Type', slug: 'foundations/type' },
						{ label: 'Spacing', slug: 'foundations/spacing' },
						{ label: 'Modes', slug: 'foundations/modes' },
						{ label: 'Tokens', slug: 'foundations/tokens' },
					],
				},
				{
					label: 'Components',
					items: [{ label: 'All components', slug: 'components' }, ...componentGroups],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Designing', slug: 'guides/designing' },
						{ label: 'React', slug: 'guides/react' },
						{ label: 'React Router', slug: 'guides/react-router' },
						{ label: 'Theming', slug: 'guides/theming' },
						{ label: 'Knowledge skill', slug: 'guides/knowledge-skill' },
					],
				},
				{
					label: 'Updates',
					items: [
						{ label: 'Changelog', slug: 'updates/changelog' },
						{ label: 'Roadmap', slug: 'updates/roadmap' },
						{ label: 'News', slug: 'updates/news' },
					],
				},
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

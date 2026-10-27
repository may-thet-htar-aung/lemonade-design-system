import type { Preview } from '@storybook/react-vite';
import '../build/css/tokens.css';
import '../src/styles.css';
import '../src/styles.unreleased.css';

const preview: Preview = {
  // A Docs page per component, with its props table. The docs site embeds it.
  tags: ['autodocs'],
  // Light/dark switch in the toolbar. The docs site embeds dark with &globals=semantic:dark.
  globalTypes: {
    semantic: {
      description: 'Semantic colour mode (data-semantic)',
      toolbar: {
        title: 'Mode',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { semantic: 'light' },
  decorators: [
    (Story, context) => {
      const root = document.documentElement;
      if (context.globals.semantic === 'dark') root.setAttribute('data-semantic', 'dark');
      else root.removeAttribute('data-semantic');
      document.body.style.background = 'var(--color-bg-base)';
      document.body.style.color = 'var(--color-text-primary)';
      return Story();
    },
  ],
};

export default preview;

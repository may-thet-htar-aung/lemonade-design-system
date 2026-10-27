import type { Preview } from '@storybook/react-vite';
import '../build/css/tokens.css';
import '../src/styles.css';
import '../src/styles.unreleased.css';

const preview: Preview = {
  // A Docs page per component, with its props table. The docs site embeds it.
  tags: ['autodocs'],
};

export default preview;

// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=162-69
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopNav } from '../TopNav/TopNav';
import { Footer } from './Footer';

/* The node is a single component with no variant properties, so the variant
   matrix has one row. */
const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Example: Figma usage note "Use it at the bottom of every Public Website page", not a matrix row.
export const ExampleBottomOfPage: Story = {
  name: 'Example: bottom of a page',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-section)' }}>
      <TopNav Page="Browse" />
      <Footer />
    </div>
  ),
};

// Figma node: https://www.figma.com/design/q0faf7S1uuzwQo4UOe7bJq/Lemonade-Components?node-id=162-69
import type { Meta, StoryObj } from '@storybook/react-vite';
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
